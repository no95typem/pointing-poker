/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { DEALER_ID } from '../../../shared/const';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgPick } from '../../../shared/types/cs-msgs/msgs/player/cs-msg-pick';
import { CSMsgVotekick } from '../../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { ROUND_STATES } from '../../../shared/types/session/round/round-state';
import { RoleManager } from './RoleManager';

export class PlayersManager extends RoleManager {
  protected listen = (ws: WebSocket, id: number, msg: CSMsg) => {
    switch (msg.cipher) {
      case CSMSG_CIPHERS.VOTEKICK:
        this.api.votekick(ws, id, msg as CSMsgVotekick);
        break;
      case CSMSG_CIPHERS.PICK:
        this.handleCardPick(id, msg as CSMsgPick);
        break;
      default:
        break;
    }
  };

  private handleCardPick(id: number, msg: CSMsgPick) {
    const { state } = this.api.getSessionState();

    if (id === DEALER_ID && !state.gSettings.isDealerPlayer) return;

    if (state.game) {
      if (
        state.game.roundState === ROUND_STATES.IN_PROCESS ||
        (state.game.roundState === ROUND_STATES.ENDED &&
          state.gSettings.isPlayerCanReselectCard)
      ) {
        const game = OBJ_PROCESSOR.deepClone(state.game);
        game.votes[id] = msg.value;

        this.api.updateState({ game });
      }
    }
  }
}
