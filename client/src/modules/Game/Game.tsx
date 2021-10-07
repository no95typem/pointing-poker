import { Box, Button, Divider, Flex, useMediaQuery } from '@chakra-ui/react';

import { useAppDispatch, useTypedSelector } from '../../redux/store';

import useSessionData from '../../hooks/useSessionData';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';

import GameControlButtons from '../../containers/GameControlButtons/GameControlButtons';
import GameTimer from '../../containers/GameTimer/GameTimer';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import IssueCards from '../../containers/IssuesCards/IssuesCards';

import DealerPlate from '../../components/DealerPlate/DealerPlate';
import UserCardsTabs from '../../components/UserCardsTabs/UserCardsTabs';
import { MAX_CONTENT_WIDTH } from '../../constants';
import GameInfo, { IGameInfo } from '../../containers/GameInfo/GameInfo';
import JoinGameLink from '../../containers/JoinGameLink/JoinGameLink';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { useRef } from 'react';
import { useEffect } from 'react';
import { fetchQuote } from '../../redux/slices/quotes';

const Game = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = useSessionData(session);

  const [isLargerThen900] = useMediaQuery('(min-width: 900px)');

  const ref = useRef<HTMLDivElement>(null!);

  const quote = useTypedSelector(state => state.quote.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuote());
  });

  if (!sessionData) return <></>;

  const {
    dealerData,
    membersData,
    sessionNameData,
    issuesData,
    gameStateData,
    isPlayerSpectator,
  } = sessionData;

  const { gameState, gameData } = gameStateData;

  const isRoundStarted = !!(
    gameState && gameState.roundState === ROUND_STATES.IN_PROCESS
  );

  const gameInfo: IGameInfo = {
    gameData,
    gameState,
    settings: session.gSettings,
    issuesData: issuesData.issues,
    members: membersData.members,
    isPlayerSpectator,
    isDealerPlaying: issuesData.settings.isDealerPlayer,
    userId: session.clientId,
    children: !isLargerThen900 ? (
      <Flex p={2} w="100%" justify="center" align="center">
        <Button
          rightIcon={<ArrowDownIcon />}
          onClick={() => {
            ref.current.parentElement?.parentElement?.scroll({
              top: ref.current.scrollHeight,
              behavior: 'smooth',
            });
          }}
        >
          To issues
        </Button>
      </Flex>
    ) : undefined,
  };

  return (
    <Flex
      maxW={MAX_CONTENT_WIDTH}
      w="100%"
      h="100%"
      m="0 auto"
      px="15px"
      alignItems="center"
      direction="column"
      gridGap={4}
      ref={ref}
    >
      <EditableHeader {...sessionNameData} />
      <Flex
        w="100%"
        direction={isLargerThen900 ? 'row' : 'column'}
        justify="space-between"
        alignItems={isLargerThen900 ? 'flex-end' : 'flex-start'}
        gridGap={4}
      >
        <DealerPlate dealerMemberData={dealerData} />
        {isRoundStarted ? (
          <GameTimer />
        ) : (
          <JoinGameLink link={`${window.location}`} />
        )}
        <GameControlButtons {...gameStateData} />
      </Flex>

      <Box w="100%">
        <UserCardsTabs {...membersData} />
        <Divider orientation="horizontal" />
      </Box>

      <Flex
        w="100%"
        flexGrow={1}
        gridGap="4"
        alignItems="start"
        justify="space-between"
        direction={isLargerThen900 ? 'row' : 'column'}
      >
        <Box
          alignSelf={isLargerThen900 ? 'start' : 'center'}
          w="320px"
          h={isLargerThen900 ? '100%' : '500px'}
          flexShrink={0}
          paddingTop={2}
          overflowY="hidden"
          order={isLargerThen900 ? 0 : 2}
          paddingBottom={isLargerThen900 ? undefined : '10px'}
        >
          <IssueCards
            {...issuesData}
            justifyTabs={isLargerThen900 ? 'start' : 'center'}
          />
        </Box>
        {isLargerThen900 ? (
          <Divider orientation="vertical" w="1px" />
        ) : (
          <Divider orientation="horizontal" h="1px" order={1} />
        )}

        <Box
          w={
            isLargerThen900
              ? 'calc(100% - 321px - var(--chakra-space-4) * 2)'
              : '100%'
          }
          h="100%"
          // minH="400px"
        >
          <GameInfo {...gameInfo} quoteData={quote} />
        </Box>
      </Flex>
      {isLargerThen900 && <Box />}
    </Flex>
  );
};

export default Game;
