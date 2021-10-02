import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';

import { ICardsGame } from '../../../../shared/types/session/card';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import { ISessionGameState } from '../../../../shared/types/session/state/session-state';

import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import GameCardsRound from '../GameCardsRound/GameCardsRound';
import RoundStatistics from '../../components/RoundStatistics/RoundStatistics';
import { Issue } from '../../../../shared/types/session/issue/issue';

export interface IGameInfo {
  gameData: ICardsGame;
  issues: Issue[];
  gameState?: ISessionGameState;
  isPlayerSpectator: boolean;
}

const GameInfo = (props: IGameInfo): JSX.Element => {
  const { isPlayerSpectator, gameState, gameData, issues } = props;

  const { isPlayerDealer, isResultsVisible } = gameData;

  if (!gameState) return <></>;

  const isRoundStarted = gameState.roundState === ROUND_STATES.IN_PROCESS;

  const isRoundFinished =
    gameState && gameState.roundState === ROUND_STATES.ENDED;

  const isRoundAwaitStart =
    gameState && gameState.roundState === ROUND_STATES.AWAIT_START;

  const getIssueTitle = (): string => {
    const issue = issues.find(issue => issue.id === gameState.currIssueId);

    return issue ? issue.title : 'undefined';
  };

  const renderElement = (): JSX.Element => {
    if (isRoundStarted && !isPlayerSpectator) {
      return <GameCardsRound {...gameData} />;
    }

    if (isRoundFinished) {
      return (
        <RoundStatistics issueTitle={getIssueTitle()} votes={gameState.votes} />
      );
    }

    return <></>;
  };

  return (
    <Box w={['100%', '100%', '66%']}>
      {isPlayerDealer && !isRoundAwaitStart && (
        <Stack w="100%" mb="30px" align="center" justify="center" p="5px 20px">
          <Button onClick={SERVER_ADAPTER.toggleResultsVisibility}>
            {isResultsVisible ? 'Hide results' : 'Show results'}
          </Button>
        </Stack>
      )}
      {renderElement()}
    </Box>
  );
};

export default GameInfo;
