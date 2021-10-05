import { Button, Flex, useColorMode } from '@chakra-ui/react';

import { ICardsGame } from '../../../../shared/types/session/card';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import {
  ISessionGameState,
  ISessionIssues,
} from '../../../../shared/types/session/state/session-state';
import { Member } from '../../../../shared/types/session/member';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { USER_STATES } from '../../../../shared/types/user/user-state';

import { getBorderStyles } from '../../constants';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import {
  calcPercentage,
  fullfillVotes,
} from '../../../../shared/helpers/calcs/game-calcs';
import { StatisticsSliderSettings } from '../../helpers/swiperSettings';

import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import GameCardsRound from '../GameCardsRound/GameCardsRound';
import RoundControlButtons from '../RoundControlButtons/RoundControlButtons';
import { StatisticsTable } from '../../components/StatisticsTable/StatisticsTable';

export interface IGameInfo {
  gameData: ICardsGame;
  issuesData: ISessionIssues;
  gameState?: ISessionGameState;
  members: Record<number, Member>;
  isPlayerSpectator: boolean;
  isDealerPlaying: boolean;
  children: JSX.Element;
}

const GameInfo = (props: IGameInfo): JSX.Element => {
  const {
    isPlayerSpectator,
    gameState,
    gameData,
    issuesData,
    members,
    isDealerPlaying,
    children,
  } = props;

  const { isSynced, list: issues } = issuesData;

  const { isPlayerDealer, isResultsVisible } = gameData;

  const cMode = useColorMode();

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
    isSomeonePlaying &&
    isPlayerDealer &&
    gameState.currIssueId !== undefined &&
    isSynced;

  const isCardsShouldBeHidden =
    isPlayerSpectator || (isPlayerDealer && !isDealerPlaying);

  const renderStats = (): JSX.Element => {
    const issue = issues.find(issue => issue.id === gameState.currIssueId);

    if (!issue) return <div></div>;

    const fakeIssue = OBJ_PROCESSOR.deepClone(issue);

    const votes = fullfillVotes(members, gameState, isDealerPlaying);
    // votes[0] = {}
    const pct = calcPercentage(votes);

    fakeIssue.stat = { votes, pct };

    return (
      <StatisticsTable
        issues={[fakeIssue]}
        cards={gameData.cards}
        units={gameData.units}
        statCardsSettings={StatisticsSliderSettings}
      />
    );
  };

  const borderStyles = getBorderStyles(cMode.colorMode);

  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      gridGap={4}
      justify="space-between"
      align="center"
      paddingTop={2}
    >
      <Flex
        gridGap={2}
        p={2}
        justify="space-between"
        wrap="wrap"
        w="100%"
        {...borderStyles}
      >
        {isRoundControlVisible ? (
          <>
            <RoundControlButtons {...gameState} />
            {!isRoundAwaitStart && (
              <Button
                border="1px solid black"
                onClick={SERVER_ADAPTER.toggleResultsVisibility}
              >
                {isResultsVisible ? 'Hide results' : 'Show results'}
              </Button>
            )}
          </>
        ) : (
          <Button visibility="hidden" />
        )}
      </Flex>

      {isRoundStarted && !isCardsShouldBeHidden && (
        <GameCardsRound {...gameData} />
      )}
      {isRoundFinished && renderStats()}
      {children}
    </Flex>
  );
};

export default GameInfo;
