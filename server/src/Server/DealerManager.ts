/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { purify } from '../../../shared/helpers/processors/purify';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgForceKick } from '../../../shared/types/cs-msgs/msgs/dealer/cs-msg-force-kick';
import { CSMsgUpdateState } from '../../../shared/types/cs-msgs/msgs/dealer/cs-msg-update-state';
import { ROUND_STATES } from '../../../shared/types/session/round/round-state';
import { ISessionGameState } from '../../../shared/types/session/state/session-state';
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
      case CSMSG_CIPHERS.START_ROUND:
        this.handleStartRestartRound();
        break;
      case CSMSG_CIPHERS.RESTART_ROUND:
        this.handleStartRestartRound();
        break;
      case CSMSG_CIPHERS.STOP_ROUND:
        this.handleStopRound();
        break;
      case CSMSG_CIPHERS.NEXT_ISSUE:
        this.handleNewIssue();
        break;
      case CSMSG_CIPHERS.END_GAME:
        this.api.endSession();
        break;
      default:
        break;
    }
  };

  private handleStartRestartRound() {
    const { state } = this.api.getSessionState();

    if (
      state.stage === SESSION_STAGES.GAME &&
      state.game?.currIssueId !== undefined &&
      state.game.roundState !== ROUND_STATES.IN_PROCESS
    ) {
      const game = OBJ_PROCESSOR.deepClone(state.game);

      const time = Date.now();

      game.roundState = ROUND_STATES.IN_PROCESS;
      game.roundStartTime = time;
      game.votes = {};

      if (state.currentGameSettings.isTimerNeeded) {
        const roundTime = state.currentGameSettings.roundTime;

        setTimeout(() => {
          const { state } = this.api.getSessionState();

          if (
            state.stage === SESSION_STAGES.GAME &&
            state.game?.roundState === ROUND_STATES.IN_PROCESS &&
            state.game.roundStartTime === time
          ) {
            this.api.tryToEndRound(true);
          }
        }, roundTime);
      }

      this.api.updateState({ game });
    }
  }

  private handleStopRound() {
    const { state } = this.api.getSessionState();

    if (
      state.stage === SESSION_STAGES.GAME &&
      state.game?.roundState === ROUND_STATES.IN_PROCESS
    ) {
      this.api.tryToEndRound(true);
    }
  }

  private handleSessionStateUpdate(msg: CSMsgUpdateState) {
    if (
      msg.update.currentGameSettings ||
      msg.update.issues ||
      msg.update.name
    ) {
      const purified = purify(msg.update);
      const { state } = this.api.getSessionState();

      this.api.updateState(purified);

      if (purified.issues) {
        // if there is no a current issue
        // OR the current issue was deleted...
        if (
          state.game &&
          (state.game.currIssueId === undefined ||
            !purified.issues.list.some(
              iss => iss.id === (state.game as ISessionGameState).currIssueId,
            ))
        ) {
          this.handleNewIssue();
        }
      }
    }
  }

  private handleNewIssue() {
    const { state } = this.api.getSessionState();

    if (state.game?.roundState === ROUND_STATES.IN_PROCESS)
      this.api.tryToEndRound(true);

    const issues = OBJ_PROCESSOR.deepClone(state.issues);

    if (state.game?.currIssueId) {
      const oldIssue = issues.list.find(
        iss => iss.id === state.game?.currIssueId,
      );

      if (oldIssue) oldIssue.closed = true;
    }

    const nextIssue = issues.list.find(iss => !iss.closed);

    const game: ISessionGameState = {
      roundState: ROUND_STATES.AWAIT_START,
      currIssueId: nextIssue?.id,
      votes: {},
    };

    this.api.updateState({ game, issues });
  }

  private handleStartGame() {
    const { state } = this.api.getSessionState();

    if (
      state.stage === SESSION_STAGES.LOBBY &&
      Object.entries(state.currentGameSettings.cards).length > 0
    ) {
      this.api.updateState({ stage: SESSION_STAGES.GAME });
      this.handleNewIssue();
    }
  }
}
