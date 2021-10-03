import { Box, Divider, Flex, useMediaQuery } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import UseSessionData from '../../hooks/useSessionData';
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

const Game = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = UseSessionData(session);

  const [isLargerThen900] = useMediaQuery('(min-width: 900px)');

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

  console.log(session);

  const isRoundStarted = !!(
    gameState && gameState.roundState === ROUND_STATES.IN_PROCESS
  );

  const gameInfo: IGameInfo = {
    gameData,
    gameState,
    issuesData: issuesData.issues,
    members: membersData.members,
    isPlayerSpectator,
    isDealerPlaying: issuesData.settings.isDealerPlayer,
  };

  return (
    <Flex
      maxW={MAX_CONTENT_WIDTH}
      w="100%"
      h="100%"
      m="0 auto"
      px="25px"
      // gridTemplateRows="auto auto auto 1fr"
      // gridTemplateColumns="100%"
      alignItems="center"
      direction="column"
      gridGap={4}
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
          // h="100%"
          h="380px"
          flexShrink={0}
          overflowY="hidden"
          paddingTop={2}
        >
          <IssueCards
            {...issuesData}
            justifyTabs={isLargerThen900 ? 'start' : 'center'}
          />
        </Box>
        <Divider orientation="vertical" w="1px" />
        <Box w={isLargerThen900 ? 'calc(100% - 321px)' : '100%'}>
          <GameInfo {...gameInfo} />
        </Box>
      </Flex>
      <Box />
    </Flex>
  );
};

export default Game;
