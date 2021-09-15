/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgVotekick } from '../../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { RoleManager } from './RoleManager';

export class PlayersManager extends RoleManager {
  protected listen = (ws: WebSocket, id: number, msg: CSMsg) => {
    switch (msg.cipher) {
      case CSMSG_CIPHERS.VOTEKICK:
        this.api.votekick(ws, id, msg as CSMsgVotekick);
        break;
      case CSMSG_CIPHERS.PICK:
        break;
      default:
        break;
    }
  };
}
