/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { purify } from '../../../shared/helpers/processors/purify';
import { SESSION_INIT_STATE } from '../../../shared/initStates';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgChatMsg } from '../../../shared/types/cs-msgs/msgs/cs-chat-msg';
import { CSMsgConnToSess } from '../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { SCMsgChatMsg } from '../../../shared/types/sc-msgs/msgs/sc-chat-msg';
import { SCMsgConnToSessStatus } from '../../../shared/types/sc-msgs/msgs/sc-conn-to-sess-status';
import { SCMsg } from '../../../shared/types/sc-msgs/sc-msg';
import { Member } from '../../../shared/types/session/member';
import { SessionState } from '../../../shared/types/session/state/session-state';
import { UserRole, USER_ROLES } from '../../../shared/types/user/user-role';
import { USER_STATES } from '../../../shared/types/user/user-state';
import { WebSocketEvent } from '../../../shared/types/ws-event';
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

  private genNewMemberId(): number {
    return this.idCounter++;
  }

  private msgCounter = 0;

  private genNewMsgId(): number {
    return this.msgCounter++;
  }

  private sessionState: SessionState<Member> = SESSION_INIT_STATE;

  private sessionId: string;

  private spectatorLvlServiceData: Record<
    number,
    {
      ws: WebSocket;
      listener: () => void;
    }
  > = {};

  private playerLvlServiceData: Record<
    number,
    {
      ws: WebSocket;
      listener: () => void;
    }
  > = {};

  private dealerLvlServiceData:
    | { ws: WebSocket; listener: () => void }
    | undefined;

  constructor(init: SessionManagerInit, private send: WebSocketSendFunc) {
    this.sessionId = init.id;

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
        this.makeDealer(ws);
      case USER_ROLES.PLAYER:
        this.makePlayer(ws, member.userSessionPublicId);
      default:
        this.makeSpectator(ws, member.userSessionPublicId);
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

  private makeSpectator(ws: WebSocket, id: number) {
    const listener = this.listenSpectatorLvl.bind(this, ws, id) as () => void;
    this.spectatorLvlServiceData[id] = { ws, listener };
    ws.addEventListener('message', listener);
  }

  private listenSpectatorLvl = (
    ws: WebSocket,
    id: number,
    e: WebSocketEvent,
  ) => {
    try {
      const parsed = JSON.parse(e.data as string);

      if ('cipher' in parsed) {
        switch ((parsed as CSMsg).cipher) {
          case CSMSG_CIPHERS.CHAT_MSG:
            this.handleChatMsg(ws, id, parsed as CSMsgChatMsg);

            return;

          default:
            // eslint-disable-next-line no-useless-return
            return;
        }
      }
    } catch {
      //
    }
  };

  private makePlayer(ws: WebSocket, id: number) {
    const listener = this.listenPlayerLvl.bind(this, ws) as () => void;
    this.playerLvlServiceData[id] = { ws, listener };
    ws.addEventListener('message', listener);
  }

  private listenPlayerLvl = (ws: WebSocket, e: WebSocketEvent) => {};

  private makeDealer(ws: WebSocket) {
    const listener = this.listenDealerLvl.bind(this, ws) as () => void;
    ws.addEventListener('message', listener);
  }

  private listenDealerLvl = (ws: WebSocket, e: WebSocketEvent) => {};

  private handleChatMsg(ws: WebSocket, id: number, dirtyMsg: CSMsgChatMsg) {
    // TODO (no95typem) add memory ?
    const pureMsg = purify(dirtyMsg);
    const msg = new SCMsgChatMsg({
      memberId: id,
      text: pureMsg.msg.text,
      senderMsgId: pureMsg.msg.senderMsgId,
      time: Date.now(),
      serverMsgId: this.genNewMsgId(),
    });
    this.broadcast(msg, USER_ROLES.SPECTATOR);
  }

  private broadcast(msg: SCMsg, level: UserRole) {
    /* eslint-disable no-fallthrough */
    switch (level) {
      case USER_ROLES.SPECTATOR:
        Object.values(this.spectatorLvlServiceData).forEach(rec => {
          this.send(rec.ws, msg);
        });
      case USER_ROLES.PLAYER:
        Object.values(this.playerLvlServiceData).forEach(rec => {
          this.send(rec.ws, msg);
        });
      default:
        if (this.dealerLvlServiceData?.ws)
          this.send(this.dealerLvlServiceData.ws, msg);
    }
    /* eslint-enable no-fallthrough */
  }
}
