/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { UNDEFINED_CARD_VALUE } from '../../../shared/const';
import {
  calcPercentage,
  fullfillVotes,
} from '../../../shared/helpers/calcs/game-calcs';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { purify } from '../../../shared/helpers/processors/purify';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgForceKick } from '../../../shared/types/cs-msgs/msgs/dealer/cs-msg-force-kick';
import { CSMSGNewConnectionResponse } from '../../../shared/types/cs-msgs/msgs/dealer/cs-msg-new-connection-response';
import { CSMSgToggleResultsVisibility } from '../../../shared/types/cs-msgs/msgs/dealer/cs-msg-toggle-results-visibility';
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
        this.handleNewIssue();
        this.api.endSession();
        break;
      case CSMSG_CIPHERS.NEW_CONNECTION_REPSONSE:
        this.api.takeFromIncubator(
          (msg as CSMSGNewConnectionResponse).id,
          (msg as CSMSGNewConnectionResponse).allow,
        );
        break;
      case CSMSG_CIPHERS.TOGGLE_RESULTS_VISIBILITY:
        this.handleToggleResultsVisibility(msg as CSMSgToggleResultsVisibility);
        break;
      default:
        break;
    }
  };

  private handleToggleResultsVisibility(msg: CSMSgToggleResultsVisibility) {
    const { state } = this.api.getSessionState();

    if (state.game && msg.setIsVisible !== state.game.isResultsVisible) {
      const game: ISessionGameState = {
        ...state.game,
        isResultsVisible: msg.setIsVisible,
      };

      this.api.updateState({ game });
    }
  }

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

      if (state.gSettings.isTimerNeeded) {
        const roundTime = state.gSettings.roundTime;

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
    if (msg.update.gSettings || msg.update.issues || msg.update.name) {
      const purified = purify(msg.update);

      const { state } = this.api.getSessionState();

      this.api.updateState(purified);

      if (purified.issues) {
        // if there is no a current issue
        // OR the current issue was deleted...

        if (
          state.game &&
          (state.game.roundState === ROUND_STATES.AWAIT_START ||
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

    if (
      state.game?.currIssueId !== undefined &&
      state.game.roundState === ROUND_STATES.ENDED
    ) {
      const oldIssue = issues.list.find(
        iss => iss.id === state.game?.currIssueId,
      );

      if (oldIssue) {
        const fullfilledVotes = fullfillVotes(
          state.members,
          state.game,
          state.gSettings.isDealerPlayer,
        );

        const pct = calcPercentage(fullfilledVotes);

        const mostPopularEntry =
          oldIssue.value ??
          Object.entries(pct).sort((a, b) => b[1].count - a[1].count)[0];

        oldIssue.closed = true;
        oldIssue.value = mostPopularEntry
          ? mostPopularEntry[0]
          : UNDEFINED_CARD_VALUE;
        oldIssue.stat = {
          votes: fullfilledVotes,
          pct,
        };
      }
    }

    const nextIssue = issues.list.find(iss => !iss.closed);

    const game: ISessionGameState = {
      roundState: ROUND_STATES.AWAIT_START,
      currIssueId: nextIssue?.id,
      isResultsVisible: false,
      votes: {},
    };

    this.api.updateState({ game, issues });
  }

  private handleStartGame() {
    const { state } = this.api.getSessionState();

    if (
      state.stage === SESSION_STAGES.LOBBY &&
      Object.entries(state.gSettings.cards).length > 0
    ) {
      this.api.updateState({ stage: SESSION_STAGES.GAME });
      this.handleNewIssue();
    }
  }
}
