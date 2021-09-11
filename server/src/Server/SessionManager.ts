/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { purify } from '../../../shared/helpers/processors/purify';
import { SESSION_INIT_STATE } from '../../../shared/initStates';
import { CSMsgConnToSess } from '../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { SCMsgConnToSessStatus } from '../../../shared/types/sc-msgs/msgs/sc-conn-to-sess-status';
import { SCMsg } from '../../../shared/types/sc-msgs/sc-msg';
import { Member } from '../../../shared/types/session/member';
import { SessionState } from '../../../shared/types/session/state/session-state';
import { UserRole, USER_ROLES } from '../../../shared/types/user/user-role';
import { USER_STATES } from '../../../shared/types/user/user-state';
import { WebSocketSendFunc } from '../types';
import { DealerManager } from './DealerManager';
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

  private sessionId: string;

  private sessionState: SessionState<Member> = SESSION_INIT_STATE;

  private members: Record<number, Member> = {};

  private webSocketsMap: Map<WebSocket, number> = new Map();

  private membersIdCounter = 0;

  private genNewMemberId(): number {
    return this.membersIdCounter++;
  }

  constructor(init: SessionManagerInit, private send: WebSocketSendFunc) {
    this.sessionId = init.id;
    this.dealerManager = new DealerManager(this.broadcast);
    this.playersManager = new PlayersManager(this.broadcast);
    this.spectatorsManager = new SpectatorManager(this.broadcast);

    const msg = purify(init.initMsg);

    const member: Member = {
      userInfo: msg.userInfo,
      userRole: USER_ROLES.DEALER,
      userState: USER_STATES.CONNECTED,
      userSessionPublicId: this.genNewMemberId(),
      isSynced: true,
    };
    this.members[member.userSessionPublicId] = member;
    this.webSocketsMap.set(init.initWS, member.userSessionPublicId);

    const respMsg = new SCMsgConnToSessStatus({
      connInfo: { sessionId: this.sessionId, yourMemberRec: member },
    });
    this.send(init.initWS, respMsg);

    console.log('session created');
  }

  getConnectedMembers(): Member[] {
    return Object.values(this.members).filter(
      member => member.userState === USER_STATES.CONNECTED,
    );
  }

  addMember(ws: WebSocket, initMsg: CSMsgConnToSess) {
    const member: Member = {
      userInfo: initMsg.query.info,
      userRole:
        initMsg.query.role === 'PLAYER'
          ? USER_ROLES.PLAYER
          : USER_ROLES.SPECTATOR,
      userState: USER_STATES.CONNECTED,
      userSessionPublicId: this.genNewMemberId(),
      isSynced: true,
    };
    this.members[member.userSessionPublicId] = member;
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

    const msg = new SCMsgConnToSessStatus({
      connInfo: { sessionId: this.sessionId, yourMemberRec: member },
    });
    this.send(ws, msg);

    console.log('member connected');
  }

  removeMember(ws: WebSocket) {
    const id = this.webSocketsMap.get(ws);

    if (id !== undefined && this.members[id]) {
      this.members[id].userState = 'DISCONNECTED';
      console.log('member disconnected');
      // TODO (no95typem): broadcast change;
      // remove event listeners
    } else {
      // should never be executed
      console.error(
        `attempt to remove not existing member fro session ${this.sessionId} with id ${id}`,
      );
    }
  }

  private broadcast = (msg: SCMsg, level: UserRole) => {
    /* eslint-disable no-fallthrough */
    switch (level) {
      case USER_ROLES.SPECTATOR:
        this.spectatorsManager.getWebSockets().forEach(ws => {
          this.send(ws, msg);
        });
      case USER_ROLES.PLAYER:
        this.playersManager.getWebSockets().forEach(ws => {
          this.send(ws, msg);
        });
      default:
        this.dealerManager.getWebSockets().forEach(ws => {
          this.send(ws, msg);
        });

        return;
    }
    /* eslint-enable no-fallthrough */
  };
}
