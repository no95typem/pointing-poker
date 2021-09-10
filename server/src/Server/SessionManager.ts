import WebSocket from 'ws';
import { CSMsgConnToSess } from '../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { SCMsgConnToSessStatus } from '../../../shared/types/sc-msgs/msgs/sc-conn-to-sess-status';
import { Member } from '../../../shared/types/session/member';
import { USER_ROLES } from '../../../shared/types/user/user-role';
import { USER_STATES } from '../../../shared/types/user/user-state';
import { WebSocketSendFunc } from '../types';

export interface SessionManagerInit {
  initWS: WebSocket;
  initMsg: CSMsgCreateSession;
  id: string;
}

export class SessionManager {
  private members: Record<number, Member> = {};

  private webSocketsMap: Map<WebSocket, number> = new Map();

  private idCounter = 0;

  private sessionId: string;

  private genNewMemberId(): number {
    return this.idCounter++;
  }

  constructor(init: SessionManagerInit, private send: WebSocketSendFunc) {
    this.sessionId = init.id;

    const member: Member = {
      userInfo: init.initMsg.userInfo,
      userRole: USER_ROLES.DEALER,
      userState: USER_STATES.CONNECTED,
      userSessionPublicId: this.genNewMemberId(),
      isSynced: true,
    };
    this.members[member.userSessionPublicId] = member;
    this.webSocketsMap.set(init.initWS, member.userSessionPublicId);

    const msg = new SCMsgConnToSessStatus({
      connInfo: { sessionId: this.sessionId, yourMemberRec: member },
    });
    this.send(init.initWS, msg);

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
          : USER_ROLES.SPECTACLE,
      userState: USER_STATES.CONNECTED,
      userSessionPublicId: this.genNewMemberId(),
      isSynced: true,
    };
    this.members[member.userSessionPublicId] = member;
    this.webSocketsMap.set(ws, member.userSessionPublicId);

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
      // TODO (no95typem): logic error
    }
  }
}
