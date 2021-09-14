/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { purify } from '../../../shared/helpers/processors/purify';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgForceKick } from '../../../shared/types/cs-msgs/msgs/dealer/cs-msg-force-kick';
import { CSMsgUpdateState } from '../../../shared/types/cs-msgs/msgs/dealer/cs-msg-update-state';
import { SESSION_STAGES } from '../../../shared/types/session/state/stages';
import { RoleManager } from './RoleManager';

export class DealerManager extends RoleManager {
  protected listen = (ws: WebSocket, id: number, msg: CSMsg) => {
    switch (msg.cipher) {
      case CSMSG_CIPHERS.START_GAME:
        this.handleStartGame();
        break;
      case CSMSG_CIPHERS.UPDATE_SESSION_STATE:
        this.handleSessionStateUpdate(msg as CSMsgUpdateState);
        break;
      case CSMSG_CIPHERS.FORCE_KICK:
        this.api.forcekick((msg as CSMsgForceKick).targetId);
        break;
      default:
        break;
    }
  };

  private handleSessionStateUpdate(msg: CSMsgUpdateState) {
    if (
      msg.update.currentGameSettings ||
      msg.update.issues ||
      msg.update.name
    ) {
      const purified = purify(msg.update);
      this.api.updateState(purified);
    }
  }

  private handleStartGame() {
    if (this.api.getSessionState().stage === SESSION_STAGES.LOBBY) {
      this.api.updateState({ stage: SESSION_STAGES.GAME });
    }
  }
}
