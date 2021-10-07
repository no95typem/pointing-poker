import { useEffect, useState } from 'react';
import { Button, Flex, Text, useColorMode } from '@chakra-ui/react';

import { ReactComponent as UndrawCoWorking } from '../../assets/images/undraw/co-working.svg';
import { ReactComponent as UndrawChilling } from '../../assets/images/undraw/chilling.svg';
import { ReactComponent as UndrawMeditation } from '../../assets/images/undraw/meditation.svg';

import { getBorderStyles } from '../../constants';
import { ICardsGame, ICardsRound } from '../../../../shared/types/session/card';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import {
  ISessionGameState,
  ISessionIssues,
} from '../../../../shared/types/session/state/session-state';
import { Member } from '../../../../shared/types/session/member';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { USER_STATES } from '../../../../shared/types/user/user-state';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import {
  calcPercentage,
  fullfillVotes,
} from '../../../../shared/helpers/calcs/game-calcs';
import { ISettings } from '../../../../shared/types/settings';
import { ISSUE_PRIORITIES } from '../../../../shared/types/session/issue/issue-priority';
import { IssueForRender } from '../../types/IssueForRender';
import { StatisticsSliderSettings } from '../../helpers/swiperSettings';

import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import GameCardsRound from '../GameCardsRound/GameCardsRound';
import RoundControlButtons from '../RoundControlButtons/RoundControlButtons';
import { StatisticsTable } from '../../components/StatisticsTable/StatisticsTable';
import { useMemo } from 'react';

export interface IGameInfo {
  gameData: ICardsGame;
  issuesData: ISessionIssues;
  gameState?: ISessionGameState;
  members: Record<number, Member>;
  isPlayerSpectator: boolean;
  isDealerPlaying: boolean;
  children?: JSX.Element;
  settings: ISettings;
  userId?: number;
  quoteData?: { content: string; author: string };
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
    settings,
    userId,
    quoteData,
  } = props;

  const { isSynced, list: issues } = issuesData;

  const { isPlayerDealer, isResultsVisible, units, cards } = gameData;

  const cMode = useColorMode();

  const [selectedCardValue, setSelectedCardValue] = useState('');

  const rand = useMemo(() => Math.random() > 0.5, []);

  useEffect(() => {
    if (
      !gameState ||
      !setSelectedCardValue ||
      gameState.roundState === ROUND_STATES.ENDED
    )
      return;
    setSelectedCardValue('');
    // eslint-disable-next-line
  }, [gameState?.roundState]);

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

  const pickCard = (value: string) => {
    setSelectedCardValue(value);

    SERVER_ADAPTER.pickCard(value);
  };

  const roundData: ICardsRound = { units, cards, pickCard, selectedCardValue };

  const renderStats = (): JSX.Element => {
    // clone real issue or create fake
    const realIssue = OBJ_PROCESSOR.deepClone(
      issues.find(issue => issue.id === gameState.currIssueId),
    );

    const issue: IssueForRender = realIssue || {
      id: 0,
      title: '',
      link: '',
      priority: ISSUE_PRIORITIES.MEDIUM,
      closed: false,
      isSynced: true,
    };

    if (!isRoundAwaitStart) {
      if (gameState.isResultsVisible || isPlayerDealer) {
        const votes = fullfillVotes(members, gameState, isDealerPlaying);
        const pct = calcPercentage(votes);
        issue.stat = { votes, pct };
      } else {
        issue.replaceElem = (
          <Flex align="center">
            <Text>Results are not available yet</Text>
            <UndrawMeditation style={{ height: '100%' }} />
          </Flex>
        );
      }
    } else {
      if (realIssue) {
        issue.replaceElem = isPlayerDealer ? (
          <Text fontSize="sm" textAlign="center">
            Press "run round" to start. Or you can rearrange your issues first.
          </Text>
        ) : (
          <Text>Waiting for round start.</Text>
        );
      } else {
        issue.replaceElem = (
          <Text>It's time to end the game or create a new issue.</Text>
        );
      }
    }

    return (
      <StatisticsTable
        issues={[issue]}
        cards={gameData.cards}
        units={gameData.units}
        statCardsSettings={StatisticsSliderSettings}
        userId={userId}
      />
    );
  };

  const borderStyles = getBorderStyles(cMode.colorMode);

  const renderCards =
    (isRoundStarted || (isRoundFinished && settings.isPlayerCanReselectCard)) &&
    !isCardsShouldBeHidden;

  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      gridGap={4}
      justify="space-between"
      align="center"
      py={4}
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
        ) : quoteData ? (
          <Text
            fontFamily="handwrite"
            textAlign="center"
            w="100%"
          >{`${quoteData.content}, ${quoteData.author}`}</Text>
        ) : (
          <Button visibility="hidden" />
        )}
      </Flex>
      {renderStats()}
      {renderCards ? (
        <GameCardsRound {...roundData} />
      ) : (
        <Flex h="220px" w="100%" justify="center">
          {gameState.roundState === ROUND_STATES.AWAIT_START &&
            (rand ? (
              <UndrawCoWorking style={{ maxHeight: '100%' }} />
            ) : (
              <UndrawChilling style={{ maxHeight: '100%' }} />
            ))}
        </Flex>
      )}
      {children}
    </Flex>
  );
};

export default GameInfo;
