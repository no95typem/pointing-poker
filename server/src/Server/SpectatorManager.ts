/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { purify } from '../../../shared/helpers/processors/purify';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgChatMsg } from '../../../shared/types/cs-msgs/msgs/spectator/cs-chat-msg';
import { SCMsgChatMsg } from '../../../shared/types/sc-msgs/msgs/sc-chat-msg';
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
    if (dirtyMsg.msg.memberId !== id || typeof dirtyMsg.msg.time !== 'number') {
      const msg = new SCMsgChatMsg({
        ...dirtyMsg.msg,
        rejected: true,
      });
      this.api.send(ws, JSON.stringify(msg));
    }

    const purifiedMsg = purify(dirtyMsg);

    // TODO (no95typem) add memory ?
    const msg = new SCMsgChatMsg(purifiedMsg.msg);
    this.api.broadcast(msg, USER_ROLES.SPECTATOR);
  }
}
