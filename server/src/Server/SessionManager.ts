/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { DEALER_ID } from '../../../shared/const';
import { purify } from '../../../shared/helpers/processors/purify';
import { SESSION_INIT_STATE } from '../../../shared/initStates';
import { CSMsgConnToSess } from '../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { CSMsgVotekick } from '../../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { SCMsgConnToSessStatus } from '../../../shared/types/sc-msgs/msgs/sc-conn-to-sess-status';
import { SCMsgMembersChanged } from '../../../shared/types/sc-msgs/msgs/sc-msg-members-changed';
import { SCMsgUpdateSessionStateMsg } from '../../../shared/types/sc-msgs/msgs/sc-update-session-state';
import { SCMsg } from '../../../shared/types/sc-msgs/sc-msg';
import { Member } from '../../../shared/types/session/member';
import { ROUND_STATES } from '../../../shared/types/session/round/round-state';
import { SessionState } from '../../../shared/types/session/state/session-state';
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

  private sessionState: SessionState<Member> = SESSION_INIT_STATE;

  private webSocketsMap: Map<WebSocket, number> = new Map();

  private membersIdCounter = 0;

  private genNewMemberId(): number {
    return this.membersIdCounter++;
  }

  private api: SessionManagerAPI;

  private kicksMan: KicksManager;

  constructor(init: SessionManagerInit, private cmAPI: ClientManagerAPI) {
    this.api = {
      ...this.cmAPI,
      broadcast: this.broadcast,
      checkMemberState: (id: number) =>
        this.sessionState.members[id]?.userState,
      getSessionState: () => this.sessionState,
      updateState: this.updateState,
      kick: this.kick,
      votekick: (ws: WebSocket, id: number, msg: CSMsgVotekick) => {
        this.kicksMan.handleVotekick(ws, id, msg);
      },
      forcekick: (targetId: number) => {
        this.kicksMan.handleDealerForceKick(targetId);
      },
    };

    this.dealerManager = new DealerManager(this.api);
    this.playersManager = new PlayersManager(this.api);
    this.spectatorsManager = new SpectatorManager(this.api);
    this.kicksMan = new KicksManager(this.api);

    this.sessionState.sessionId = init.id;
    this.sessionState.currentGameSettings = purify(init.initMsg.query.settings);

    const fakeConnMsg = new CSMsgConnToSess({
      sessId: this.sessionState.sessionId,
      info: init.initMsg.query.userInfo,
      role: USER_ROLES.DEALER,
    });
    this.addMember(init.initWS, fakeConnMsg, USER_ROLES.DEALER);

    console.log('session created');
  }

  getConnectedMembers(): Member[] {
    return Object.values(this.sessionState.members).filter(
      member => member.userState === USER_STATES.CONNECTED,
    );
  }

  addMember(ws: WebSocket, initMsg: CSMsgConnToSess, role?: UserRole) {
    const pureInitMsg = purify(initMsg);

    const member: Member = {
      userInfo: pureInitMsg.query.info,
      userRole:
        role || pureInitMsg.query.role === 'PLAYER'
          ? USER_ROLES.PLAYER
          : USER_ROLES.SPECTATOR,
      userState: USER_STATES.CONNECTED,
      userSessionPublicId: this.genNewMemberId(),
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

    const rMsg = new SCMsgConnToSessStatus({
      success: {
        yourId: member.userSessionPublicId,
        state: this.sessionState,
      },
    });
    this.api.send(ws, JSON.stringify(rMsg));

    console.log('member connected');
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

      this.sessionState.members[id].userState = newState;

      const update: Record<number, Partial<Member>> = {};
      update[id] = { userState: newState, isSynced: true };

      const msg = new SCMsgMembersChanged(update);
      this.broadcast(msg, USER_ROLES.SPECTATOR);

      console.log('member disconnected');
    } else {
      // should never be executed
      console.error(
        `attempt to remove not existing member fro session ${this.sessionState.sessionId} with id ${id}`,
      );
    }
  }

  private updateState = (update: Partial<SessionState<Member>>) => {
    Object.assign(this.sessionState, update);

    const msg = new SCMsgUpdateSessionStateMsg(update);
    this.broadcast(msg, USER_ROLES.SPECTATOR);
  };

  private kick = (id: number) => {
    if (this.sessionState.members[id]?.userState === USER_STATES.CONNECTED) {
      const ws = [...this.webSocketsMap].find(entry => entry[1] === id)?.[0];

      if (ws) this.removeMember(ws, true);
    }
  };

  private broadcast = (msg: SCMsg, level: UserRole, skipIds?: number[]) => {
    const json = JSON.stringify(msg);
    /* eslint-disable no-fallthrough */
    switch (level) {
      case USER_ROLES.SPECTATOR:
        this.spectatorsManager.getMembers().forEach(entry => {
          if (!skipIds?.includes(entry.id)) this.api.send(entry.ws, json);
        });
      case USER_ROLES.PLAYER:
        this.playersManager.getMembers().forEach(entry => {
          if (!skipIds?.includes(entry.id)) this.api.send(entry.ws, json);
        });
      default:
        this.dealerManager.getMembers().forEach(entry => {
          if (!skipIds?.includes(entry.id)) this.api.send(entry.ws, json);
        });

        return;
    }
    /* eslint-enable no-fallthrough */
  };

  /* GAME */
  private tryToEndRound() {
    if (this.sessionState.game?.roundState === ROUND_STATES.IN_PROCESS) {
      const playersRecs = this.playersManager.getMembers();

      const isNotEnd = playersRecs.some(rec => {
        if (
          rec.id === DEALER_ID &&
          !this.sessionState.currentGameSettings.dealerAsPlayer
        ) {
          return false;
        }

        const vote = this.sessionState.game?.votes[rec.id];

        if (vote === undefined) return true;

        return false;
      });

      if (!isNotEnd) {
        const game = this.sessionState.game;
        game.roundState = ROUND_STATES.ENDED;

        // const issues =

        this.updateState({ game });
      }
    }
  }

  private pickCard(id: number, value: string | undefined) {
    if (!this.sessionState.game) return;

    if (this.sessionState.game.roundState === ROUND_STATES.AWAIT_START) return;

    if (
      this.sessionState.game.roundState === ROUND_STATES.ENDED &&
      !this.sessionState.currentGameSettings.changingCardInRoundEnd
    ) {
      return;
    }

    if (
      id === DEALER_ID &&
      !this.sessionState.currentGameSettings.dealerAsPlayer
    ) {
      return;
    }

    const game = this.sessionState.game;
    game.votes[id] = value;

    this.updateState({ game });
  }
  /* /GAME */
}
