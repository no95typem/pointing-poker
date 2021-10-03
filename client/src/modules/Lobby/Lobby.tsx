import { Box, Divider, Flex, useMediaQuery } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import useSessionData from '../../hooks/useSessionData';
import useLocalSettings from '../../hooks/useLocalSettings';

import { IGameStateData } from '../../../../shared/types/session/state/session-state';
import { ISettingsData } from '../../../../shared/types/settings';

import GameControlButtons from '../../containers/GameControlButtons/GameControlButtons';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import IssueCards from '../../containers/IssuesCards/IssuesCards';
import JoinGameLink from '../../containers/JoinGameLink/JoinGameLink';
import DealerPlate from '../../components/DealerPlate/DealerPlate';
import UserCardsTabs from '../../components/UserCardsTabs/UserCardsTabs';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';
import { MAX_CONTENT_WIDTH } from '../../constants';

const Lobby = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = useSessionData(session);

  const { localSettings, setLocalSettings } = useLocalSettings();

  const [isLargerThen900] = useMediaQuery('(min-width: 900px)');

  if (!sessionData) return <></>;

  const {
    dealerData,
    membersData,
    sessionNameData,
    issuesData,
    isPlayerDealer,
    gameStateData,
  } = sessionData;

  const gameStateLobby: IGameStateData = {
    ...gameStateData,
    localSettings,
  };

  const settingsData: ISettingsData = {
    ...{
      localSettings,
      setLocalSettings,
    },
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
        <JoinGameLink link={`${window.location}`} />
        <GameControlButtons {...gameStateLobby} />
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
          h="400px"
          flexShrink={0}
        >
          <IssueCards
            {...issuesData}
            justifyTabs={isLargerThen900 ? 'start' : 'center'}
          />
        </Box>
        <Divider orientation="vertical" w="1px" />
        <Box w={isLargerThen900 ? 'calc(100% - 321px)' : '100%'}>
          {isPlayerDealer && <SettingsTabs {...settingsData} />}
        </Box>
      </Flex>
      <Box />
    </Flex>
  );
};

export default Lobby;
