/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { purify } from '../../../shared/helpers/processors/purify';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgChatMsg } from '../../../shared/types/cs-msgs/msgs/spectator/cs-msg-chat-msg';
import { SCMsgChatMsgsChanged } from '../../../shared/types/sc-msgs/msgs/sc-msg-chat-msgs-changed';
import { ChatMsg } from '../../../shared/types/session/chat/chat-msg';
import { USER_ROLES } from '../../../shared/types/user/user-role';
import { RoleManager } from './RoleManager';

export class SpectatorManager extends RoleManager {
  protected listen = (ws: WebSocket, id: number, msg: CSMsg) => {
    switch (msg.cipher) {
      case CSMSG_CIPHERS.CHAT_MSG:
        this.handleChatMsg(ws, id, msg as CSMsgChatMsg);

        return;

      default:
        // eslint-disable-next-line no-useless-return
        return;
    }
  };

  private handleChatMsg(ws: WebSocket, id: number, dirtyMsg: CSMsgChatMsg) {
    const update: Record<string, ChatMsg> = {};

    if (dirtyMsg.msg.memberId !== id || typeof dirtyMsg.msg.time !== 'number') {
      update[`${dirtyMsg.msg.time}-${dirtyMsg.msg.memberId}`] = {} as ChatMsg;
      const { state } = this.api.getSessionState();
      const msg = new SCMsgChatMsgsChanged(state.sessionId, {
        command: 'D',
        update,
      });
      this.api.send(ws, JSON.stringify(msg));
    } else {
      const purifiedMsg = purify(dirtyMsg);

      const time = Date.now();
      const key = `${time}-${purifiedMsg.msg.memberId}`;

      update[key] = {
        ...purifiedMsg.msg,
        time,
        clientTime: undefined,
      };

      const state = this.api.dang_getSessState();

      Object.assign(state.chat.msgs, update);

      const keys = Object.keys(state.chat.msgs);

      keys.slice(0, keys.length - 50).forEach(key => {
        delete state.chat.msgs[key];
      });

      const bMsg = new SCMsgChatMsgsChanged(state.sessionId, {
        command: 'A',
        update,
      });
      this.api.broadcast(bMsg, USER_ROLES.SPECTATOR, [id]);

      update[key] = {
        ...update[key],
        clientTime: purifiedMsg.msg.time,
      };

      const rMsg = new SCMsgChatMsgsChanged(state.sessionId, {
        command: 'A',
        update,
      });
      this.api.send(ws, JSON.stringify(rMsg));
    }
  }
}
