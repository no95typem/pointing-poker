/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { DEALER_ID } from '../../../shared/const';
import { genUniqIdWithCrypto } from '../../../shared/helpers/generators/node-specific';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { purify } from '../../../shared/helpers/processors/purify';
import { CREATE_INIT_STATE } from '../../../shared/initStates';
import { KNOWN_ERRORS_KEYS } from '../../../shared/knownErrorsKeys';
import { CSMsgConnToSess } from '../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { CSMsgVotekick } from '../../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { SCMsgConnToSessStatus } from '../../../shared/types/sc-msgs/msgs/sc-msg-conn-to-sess-status';
import { SCMsgMembersChanged } from '../../../shared/types/sc-msgs/msgs/sc-msg-members-changed';
import { SCMsgNewConnection } from '../../../shared/types/sc-msgs/msgs/sc-msg-new-connection';
import { SCMsgUpdateSessionState } from '../../../shared/types/sc-msgs/msgs/sc-msg-update-session-state';
import { SCMsgYouWereKicked } from '../../../shared/types/sc-msgs/msgs/sc-msg-you-were-kicked';
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

  private incubator: Record<
    number,
    {
      member: Member;
      ws: WebSocket;
    }
  > = {};

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
      takeFromIncubator: this.takeFromIncubator,
    };

    this.dealerManager = new DealerManager(this.api);
    this.playersManager = new PlayersManager(this.api);
    this.spectatorsManager = new SpectatorManager(this.api);
    this.kicksMan = new KicksManager(this.api);

    this.sessionState.sessionId = init.id;
    try {
      this.sessionState.gSettings = purify(init.initMsg.query.settings);
    } catch (err) {
      console.log(err);
    }

    const fakeConnMsg = new CSMsgConnToSess({
      sessId: init.initMsg.query.controlKey,
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

    this.webSocketsMap.set(ws, member.userSessionPublicId);

    const token = isReconnect
      ? (initMsg.query.token as string)
      : genUniqIdWithCrypto(Object.keys(this.tokens));

    this.tokens[token] = member.userSessionPublicId;

    const rMsg = new SCMsgConnToSessStatus(initMsg.query.sessId, {
      wait: {
        sessId: this.sessionState.sessionId,
        token,
      },
    });

    this.api.send(ws, JSON.stringify(rMsg));

    const sessMemberRec = this.sessionState.members[tokenId as number];

    if (
      role === USER_ROLES.DEALER ||
      (!newId &&
        sessMemberRec &&
        sessMemberRec.userState !== USER_STATES.KICKED) ||
      this.sessionState.gSettings.isAutoAdmit
    ) {
      this.admitPlayer(ws, member);
    } else {
      this.incubator[member.userSessionPublicId] = {
        member,
        ws,
      };
      const msg = new SCMsgNewConnection(this.sessionState.sessionId, member);
      this.broadcast(msg, USER_ROLES.DEALER);
    }
  }

  private takeFromIncubator = (id: number, allow: boolean) => {
    if (this.incubator[id]) {
      if (allow) {
        this.admitPlayer(this.incubator[id].ws, this.incubator[id].member);
      } else {
        const msg = new SCMsgConnToSessStatus(this.sessionState.sessionId, {
          fail: {
            reason: KNOWN_ERRORS_KEYS.YOU_WERE_KICKED,
          },
        });
        this.api.send(this.incubator[id].ws, JSON.stringify(msg));
        this.kick(id, this.incubator[id].ws, true);
      }
      delete this.incubator[id];
    }
  };

  private admitPlayer(ws: WebSocket, member: Member) {
    const update: Record<number, Partial<Member>> = {};
    update[member.userSessionPublicId] = member;
    Object.assign(this.sessionState.members, update);

    const bMsg = new SCMsgMembersChanged(this.sessionState.sessionId, update);
    this.broadcast(bMsg, USER_ROLES.SPECTATOR);

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
    const rMsg = new SCMsgConnToSessStatus(this.sessionState.sessionId, {
      success: {
        yourId: member.userSessionPublicId,
        state:
          member.userRole === USER_ROLES.DEALER
            ? this.sessionState
            : (this.filterSessUpdate(this.sessionState) as SessionState),
      },
    });

    this.api.send(ws, JSON.stringify(rMsg));

    console.log(
      `member ${member.userSessionPublicId} added to session ${this.sessionState.sessionId}`,
    );
  }

  removeMember(ws: WebSocket, kick?: true) {
    const id = this.webSocketsMap.get(ws);

    if (id !== undefined) {
      this.webSocketsMap.delete(ws);

      if (id in this.incubator) delete this.incubator[id];

      if (kick) {
        const msg = new SCMsgYouWereKicked(this.sessionState.sessionId);
        this.api.send(ws, JSON.stringify(msg));
      }

      if (this.sessionState.members[id]) {
        const newState: UserState = kick
          ? USER_STATES.KICKED
          : USER_STATES.DISCONNECTED;

        this.spectatorsManager.removeMember(ws, id);
        this.playersManager.removeMember(ws, id);
        this.dealerManager.removeMember(ws, id);

        this.sessionState.members[id].userState = newState;

        const update: Record<number, Partial<Member>> = {};
        update[id] = { userState: newState, isSynced: true };

        const msg = new SCMsgMembersChanged(
          this.sessionState.sessionId,
          update,
        );
        this.broadcast(msg, USER_ROLES.SPECTATOR);

        if (id === DEALER_ID) this.endSession();
        else this.tryToEndRound();

        console.log(`member ${id} removed from session`);
      }
    } else {
      // should never be executed
      console.warn(
        `attempt to remove not existing member from session ${this.sessionState.sessionId} with id ${id}
        it is normal if member was kicked!`,
      );
    }
  }

  private filterSessUpdate = (update: Partial<SessionState>) => {
    const mod = OBJ_PROCESSOR.deepClone(update);

    if (mod.game && !mod.game.isResultsVisible) {
      mod.game.votes = {};
    }

    return mod;
  };

  private updateState = (update: Partial<SessionState>, noSend?: true) => {
    Object.assign(this.sessionState, update);

    if (!noSend) {
      const msgForDealer = new SCMsgUpdateSessionState(
        this.sessionState.sessionId,
        update,
      );

      this.broadcast(msgForDealer, USER_ROLES.DEALER);

      const filtered = this.filterSessUpdate(update);

      const msgForAll = new SCMsgUpdateSessionState(
        this.sessionState.sessionId,
        filtered,
      );

      this.broadcast(msgForAll, USER_ROLES.SPECTATOR, [DEALER_ID]);
    }

    this.tryToEndRound();
  };

  private kick = (id: number, ws?: WebSocket, noCheckState?: true) => {
    console.log(`kick member with id: ${id}`);

    if (
      noCheckState ||
      this.sessionState.members[id]?.userState === USER_STATES.CONNECTED
    ) {
      const webSocket =
        ws || [...this.webSocketsMap].find(entry => entry[1] === id)?.[0];

      if (webSocket) {
        this.removeMember(webSocket, true);
        this.api.disconnectFromSession(webSocket);
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
            !this.sessionState.gSettings.isDealerPlayer
          ) {
            return false;
          }

          const vote = this.sessionState.game?.votes[rec.id];

          if (vote === undefined) return true;

          return false;
        });

      if (!isNotEnd) {
        const game = OBJ_PROCESSOR.deepClone(this.sessionState.game);

        game.roundState = ROUND_STATES.ENDED;

        if (this.sessionState.gSettings.isCardShownOnRoundEnd) {
          game.isResultsVisible = true;
        }

        this.updateState({ game });
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
