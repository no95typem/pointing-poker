/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { DEALER_ID } from '../../../shared/const';
import { calcPercentage } from '../../../shared/helpers/calcs/game-calcs';
import { genUniqIdWithCrypto } from '../../../shared/helpers/generators/node-specific';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { purify } from '../../../shared/helpers/processors/purify';
import { CREATE_INIT_STATE } from '../../../shared/initStates';
import { CSMsgConnToSess } from '../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { CSMsgVotekick } from '../../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { SCMsgConnToSessStatus } from '../../../shared/types/sc-msgs/msgs/sc-msg-conn-to-sess-status';
import { SCMsgMembersChanged } from '../../../shared/types/sc-msgs/msgs/sc-msg-members-changed';
import { SCMsgUpdateSessionState } from '../../../shared/types/sc-msgs/msgs/sc-msg-update-session-state';
import { SCMsg } from '../../../shared/types/sc-msgs/sc-msg';
import { Member } from '../../../shared/types/session/member';
import { ROUND_STATES } from '../../../shared/types/session/round/round-state';
import { SessionState } from '../../../shared/types/session/state/session-state';
import {
  SessionStage,
  SESSION_STAGES,
} from '../../../shared/types/session/state/stages';
import { UserRole, USER_ROLES } from '../../../shared/types/user/user-role';
import { UserState, USER_STATES } from '../../../shared/types/user/user-state';
import { ClientManagerAPI, SessionManagerAPI } from '../types';
import { DealerManager } from './DealerManager';
import { KicksManager } from './KicksManager';
import { PlayersManager } from './PlayersManager';
import { SpectatorManager } from './SpectatorManager';

export interface SessionManagerInit {
  initWS: WebSocket;
  initMsg: CSMsgCreateSession;
  id: string;
}

export class SessionManager {
  private dealerManager: DealerManager;

  private playersManager: PlayersManager;

  private spectatorsManager: SpectatorManager;

  private sessionState: SessionState = CREATE_INIT_STATE();

  private webSocketsMap: Map<WebSocket, number> = new Map();

  private membersIdCounter = 0;

  private genNewMemberId(): number {
    return this.membersIdCounter++;
  }

  private api: SessionManagerAPI;

  private kicksMan: KicksManager;

  private tokens: Record<string, number> = {};

  constructor(init: SessionManagerInit, private cmAPI: ClientManagerAPI) {
    this.api = {
      ...this.cmAPI,
      broadcast: this.broadcast,
      checkMemberState: (id: number) =>
        this.sessionState.members[id]?.userState,
      getSessionState: () => {
        return { state: this.sessionState };
      },
      dang_getSessState: () => this.sessionState,
      updateState: this.updateState,
      kick: this.kick,
      votekick: (ws: WebSocket, id: number, msg: CSMsgVotekick) => {
        this.kicksMan.handleVotekick(ws, id, msg);
      },
      forcekick: (targetId: number) => {
        this.kicksMan.handleDealerForceKick(targetId);
      },
      tryToEndRound: this.tryToEndRound,
      endSession: this.endSession,
    };

    this.dealerManager = new DealerManager(this.api);
    this.playersManager = new PlayersManager(this.api);
    this.spectatorsManager = new SpectatorManager(this.api);
    this.kicksMan = new KicksManager(this.api);

    this.sessionState.sessionId = init.id;
    try {
      this.sessionState.currentGameSettings = purify(
        init.initMsg.query.settings,
      );
    } catch (err) {
      console.log(err);
    }

    const fakeConnMsg = new CSMsgConnToSess({
      sessId: this.sessionState.sessionId,
      info: init.initMsg.query.userInfo,
      role: USER_ROLES.DEALER,
    });
    this.addMember(init.initWS, fakeConnMsg, USER_ROLES.DEALER);

    console.log(`session ${init.id} created`);
  }

  getConnectedMembers(): Member[] {
    return Object.values(this.sessionState.members).filter(
      member => member.userState === USER_STATES.CONNECTED,
    );
  }

  addMember(ws: WebSocket, initMsg: CSMsgConnToSess, role?: UserRole) {
    const pureInitMsg = purify(initMsg);

    const tokenId =
      initMsg.query.token && initMsg.query.token in this.tokens
        ? this.tokens[initMsg.query.token]
        : undefined;

    const isReconnect =
      tokenId !== undefined &&
      this.sessionState.members[tokenId]?.userState !== 'CONNECTED';

    const newId = isReconnect ? undefined : this.genNewMemberId();

    const member: Member = {
      userInfo: pureInitMsg.query.info,
      userRole:
        role ||
        (pureInitMsg.query.role === 'PLAYER'
          ? USER_ROLES.PLAYER
          : USER_ROLES.SPECTATOR),
      userState: USER_STATES.CONNECTED,
      userSessionPublicId: isReconnect
        ? (tokenId as number)
        : (newId as number),
      isSynced: true,
    };

    const update: Record<number, Partial<Member>> = {};
    update[member.userSessionPublicId] = member;
    Object.assign(this.sessionState.members, update);

    const bMsg = new SCMsgMembersChanged(update);
    this.broadcast(bMsg, USER_ROLES.SPECTATOR);

    this.webSocketsMap.set(ws, member.userSessionPublicId);

    /* eslint-disable no-fallthrough */
    switch (member.userRole) {
      case USER_ROLES.DEALER:
        this.dealerManager.addMember(ws, member.userSessionPublicId);
      case USER_ROLES.PLAYER:
        this.playersManager.addMember(ws, member.userSessionPublicId);
      default:
        this.spectatorsManager.addMember(ws, member.userSessionPublicId);
    }
    /* eslint-enable no-fallthrough */
    const token = isReconnect
      ? (initMsg.query.token as string)
      : genUniqIdWithCrypto(Object.keys(this.tokens));

    this.tokens[token] = member.userSessionPublicId;

    const rMsg = new SCMsgConnToSessStatus({
      success: {
        yourId: member.userSessionPublicId,
        state: this.sessionState,
        token,
      },
    });

    console.log(initMsg.query.token, isReconnect, token);

    this.api.send(ws, JSON.stringify(rMsg));

    console.log(`member ${member.userSessionPublicId} added
    to session ${this.sessionState.sessionId}`);
  }

  removeMember(ws: WebSocket, kick?: true) {
    const id = this.webSocketsMap.get(ws);

    if (id !== undefined && this.sessionState.members[id]) {
      const newState: UserState = kick
        ? USER_STATES.KICKED
        : USER_STATES.DISCONNECTED;

      this.spectatorsManager.removeMember(ws, id);
      this.playersManager.removeMember(ws, id);
      this.dealerManager.removeMember(ws, id);
      this.webSocketsMap.delete(ws);

      this.sessionState.members[id].userState = newState;

      const update: Record<number, Partial<Member>> = {};
      update[id] = { userState: newState, isSynced: true };

      const msg = new SCMsgMembersChanged(update);
      this.broadcast(msg, USER_ROLES.SPECTATOR);

      if (newState === USER_STATES.KICKED) {
        const dMsg = new SCMsgUpdateSessionState({
          stage: SESSION_STAGES.STATS,
        });
        this.api.send(ws, JSON.stringify(dMsg));
      }

      if (id === DEALER_ID) this.endSession();
      else this.tryToEndRound();

      console.log(`member ${id} removed from session`);
    } else {
      // should never be executed
      console.warn(
        `attempt to remove not existing member from session ${this.sessionState.sessionId} with id ${id}
        it is normal if member was kicked!`,
      );
    }
  }

  private updateState = (update: Partial<SessionState>) => {
    Object.assign(this.sessionState, update);

    const msg = new SCMsgUpdateSessionState(update);
    this.broadcast(msg, USER_ROLES.SPECTATOR);

    this.tryToEndRound();
  };

  private kick = (id: number) => {
    if (this.sessionState.members[id]?.userState === USER_STATES.CONNECTED) {
      const ws = [...this.webSocketsMap].find(entry => entry[1] === id)?.[0];

      if (ws) {
        this.removeMember(ws, true);
        this.api.disconnectFromSession(ws);
      }
    }
  };

  private broadcast = (msg: SCMsg, level: UserRole, skipIds?: number[]) => {
    const json = JSON.stringify(msg);

    switch (level) {
      case USER_ROLES.SPECTATOR:
        this.spectatorsManager.getMembers().forEach(entry => {
          if (!skipIds?.includes(entry.id)) this.api.send(entry.ws, json);
        });
        break;
      case USER_ROLES.PLAYER:
        this.playersManager.getMembers().forEach(entry => {
          if (!skipIds?.includes(entry.id)) this.api.send(entry.ws, json);
        });
        break;
      default:
        this.dealerManager.getMembers().forEach(entry => {
          if (!skipIds?.includes(entry.id)) this.api.send(entry.ws, json);
        });

        return;
    }
  };

  /* GAME */
  private tryToEndRound = (force?: true) => {
    if (this.sessionState.game?.roundState === ROUND_STATES.IN_PROCESS) {
      const playersRecs = this.playersManager.getMembers();

      const isNotEnd =
        !force &&
        playersRecs.some(rec => {
          if (
            rec.id === DEALER_ID &&
            !this.sessionState.currentGameSettings.isDealerPlayer
          ) {
            return false;
          }

          const vote = this.sessionState.game?.votes[rec.id];

          if (vote === undefined) return true;

          return false;
        });

      if (!isNotEnd) {
        const game = OBJ_PROCESSOR.deepClone(this.sessionState.game);
        const issues = OBJ_PROCESSOR.deepClone(this.sessionState.issues);

        const currIssue = issues.list.find(
          iss => iss.id === this.sessionState.game?.currIssueId,
        );

        if (currIssue) {
          currIssue.stat = {
            votes: game.votes,
            percentage: calcPercentage(game.votes),
          };
        }

        game.roundState = ROUND_STATES.ENDED;
        this.updateState({ game, issues });
      }
    }
  };
  /* /GAME */

  private endSession() {
    this.tryToEndRound(true);

    // ? disable players and dealer?
    // ? left only spectators handling (chat msgs)?

    const stage: SessionStage = SESSION_STAGES.STATS;

    this.updateState({ stage });
  }
}
