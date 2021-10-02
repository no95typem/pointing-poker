import React from 'react';
import { ICardsGame } from '../../../../shared/types/session/card';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import { ISessionGameState } from '../../../../shared/types/session/state/session-state';
import GameCardsRound from '../GameCardsRound/GameCardsRound';

export interface IGameInfo {
  gameData: ICardsGame;
  isPlayerSpectator: boolean;
  gameState?: ISessionGameState;
}

const GameInfo = (props: IGameInfo): JSX.Element => {
  const { isPlayerSpectator, gameState, gameData } = props;

  const isRoundStarted = !!(
    gameState && gameState.roundState === ROUND_STATES.IN_PROCESS
  );

  const isRoundFinished = !!(
    gameState && gameState.roundState === ROUND_STATES.ENDED
  );

  const renderElement = (): JSX.Element => {
    if (isRoundStarted && !isPlayerSpectator) {
      return <GameCardsRound {...gameData} />;
    }

    if (isRoundFinished) {
      return <></>;
    }

    return <></>;
  };

  return renderElement();
};

export default GameInfo;
/* <RoundStatistics issueTitle={gameStateData.gameState?.currIssueId}  /> */
