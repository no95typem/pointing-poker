/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { purify } from '../../../shared/helpers/processors/purify';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgChatMsg } from '../../../shared/types/cs-msgs/msgs/cs-chat-msg';
import { SCMsgChatMsg } from '../../../shared/types/sc-msgs/msgs/sc-chat-msg';
import { USER_ROLES } from '../../../shared/types/user/user-role';
import { WebSocketEvent } from '../../../shared/types/ws-event';
import { RoleManager } from './RoleManager';

export class SpectatorManager extends RoleManager {
  private msgCounter = 0;

  private genNewMsgId(): number {
    return this.msgCounter++;
  }

  protected listen = (ws: WebSocket, id: number, e: WebSocketEvent) => {
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
}
