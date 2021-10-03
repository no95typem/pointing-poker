import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';

import { ICardsGame } from '../../../../shared/types/session/card';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import {
  ISessionGameState,
  ISessionIssues,
} from '../../../../shared/types/session/state/session-state';
import { Member } from '../../../../shared/types/session/member';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { USER_STATES } from '../../../../shared/types/user/user-state';

import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import GameCardsRound from '../GameCardsRound/GameCardsRound';
import RoundControlButtons from '../RoundControlButtons/RoundControlButtons';
import RoundStatistics from '../../components/RoundStatistics/RoundStatistics';

export interface IGameInfo {
  gameData: ICardsGame;
  issuesData: ISessionIssues;
  gameState?: ISessionGameState;
  members: Record<number, Member>;
  isPlayerSpectator: boolean;
  isDealerPlaying: boolean;
}

const GameInfo = (props: IGameInfo): JSX.Element => {
  const {
    isPlayerSpectator,
    gameState,
    gameData,
    issuesData,
    members,
    isDealerPlaying,
  } = props;

  const { isSynced, list: issues } = issuesData;

  const { isPlayerDealer, isResultsVisible } = gameData;

  if (!gameState) return <></>;

  const isRoundStarted = gameState.roundState === ROUND_STATES.IN_PROCESS;

  const isRoundFinished = gameState.roundState === ROUND_STATES.ENDED;

  const isRoundAwaitStart = gameState.roundState === ROUND_STATES.AWAIT_START;

  const isPlayersThere = Object.values(members).some(
    member =>
      member.userRole === USER_ROLES.PLAYER &&
      member.userState === USER_STATES.CONNECTED,
  );

  const isSomeonePlaying = isDealerPlaying || isPlayersThere;

  const isRoundControlVisible =
    isSomeonePlaying && isPlayerDealer && gameState.currIssueId && isSynced;

  const isCardsShouldBeHidden =
    isPlayerSpectator || (isPlayerDealer && !isDealerPlaying);

  const getIssueTitle = (): string => {
    const issue = issues.find(issue => issue.id === gameState.currIssueId);

    return issue ? issue.title : 'undefined';
  };

  const renderElement = (): JSX.Element => {
    if (isRoundStarted && !isCardsShouldBeHidden) {
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
      {isRoundControlVisible && <RoundControlButtons {...gameState} />}
      {isPlayerDealer && !isRoundAwaitStart && (
        <Stack w="100%" m="30px 0" align="center" justify="center" p="5px 20px">
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
