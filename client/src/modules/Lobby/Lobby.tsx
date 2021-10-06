import { Box, Divider, Flex, Text, useMediaQuery } from '@chakra-ui/react';

import { ReactComponent as UndrawDevelopment } from '../../assets/images/undraw/development.svg';
import { ReactComponent as UndrawGroupChat } from '../../assets/images/undraw/group-chat.svg';
import { ReactComponent as UndrawToDoList } from '../../assets/images/undraw/to-do-list.svg';
import { ReactComponent as UndrawWelcoming } from '../../assets/images/undraw/welcoming.svg';

import { useTypedSelector } from '../../redux/store';

import useSessionData from '../../hooks/useSessionData';
import useLocalSettings from '../../hooks/useLocalSettings';
import { MAX_CONTENT_WIDTH } from '../../constants';

import { IGameStateData } from '../../../../shared/types/session/state/session-state';
import { ISettingsData } from '../../../../shared/types/settings';

import GameControlButtons from '../../containers/GameControlButtons/GameControlButtons';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import IssueCards from '../../containers/IssuesCards/IssuesCards';
import JoinGameLink from '../../containers/JoinGameLink/JoinGameLink';
import DealerPlate from '../../components/DealerPlate/DealerPlate';
import UserCardsTabs from '../../components/UserCardsTabs/UserCardsTabs';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';

const Lobby = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = useSessionData(session);

  const { localSettings, setLocalSettings } = useLocalSettings();

  const [isLargerThen900] = useMediaQuery('(min-width: 900px)');

  const [isLargerThen591] = useMediaQuery('(min-width: 591px)');

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
        position="relative"
      >
        <DealerPlate dealerMemberData={dealerData} />
        <JoinGameLink link={`${window.location}`} />
        <GameControlButtons {...gameStateLobby} />
        {!isLargerThen900 && isLargerThen591 && (
          <UndrawWelcoming
            style={{
              position: 'absolute',
              left: 'calc(50% + 140px)',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '380px',
              maxHeight: '100%',
            }}
          />
        )}
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
        <Flex
          alignSelf={isLargerThen900 ? 'start' : 'flex-end'}
          align="center"
          w={isLargerThen900 ? '320px' : '100%'}
          h={isLargerThen900 ? '100%' : '500px'}
          flexShrink={0}
          paddingTop={2}
          // overflowY="hidden"
          justifyContent={isLargerThen591 ? 'space-around' : 'center'}
          position="relative"
          gridGap={4}
        >
          {!isLargerThen900 && isLargerThen591 && (
            <UndrawToDoList
              style={{
                width: 'calc(100% - 420px)',
                minWidth: '200px',
                // position: 'absolute',
                // left: '25px',
                // top: '50%',
                // transform: 'translateY(-50%)',
              }}
            />
          )}
          <Box h="100%" w="320px">
            <IssueCards
              {...issuesData}
              justifyTabs={isLargerThen900 ? 'start' : 'center'}
            />
          </Box>
        </Flex>
        <Divider orientation="vertical" w="1px" position="relative" />
        <Box
          w={
            isLargerThen900
              ? 'calc(100% - 321px - var(--chakra-space-4) * 2)'
              : '100%'
          }
          h="100%"
          paddingBottom={isLargerThen900 ? undefined : '10px'}
        >
          {isPlayerDealer ? (
            <SettingsTabs {...settingsData} />
          ) : (
            <Flex
              direction="column"
              justify="center"
              w="100%"
              h="100%"
              gridGap={4}
              p={4}
            >
              <Flex gridGap={4} align="center" h="45%">
                <UndrawDevelopment
                  style={{ maxHeight: '140px', height: '100%' }}
                />
                <Text fontFamily="handwrite">
                  Waiting for start of the game...
                </Text>
              </Flex>
              <Flex align="center" gridGap={4} alignSelf="flex-end" h="50%">
                <Text fontFamily="handwrite" textAlign="right">
                  It's good time to discuss the meeting...
                </Text>
                <UndrawGroupChat
                  style={{ maxHeight: '180px', height: '100%' }}
                />
              </Flex>
            </Flex>
          )}
        </Box>
      </Flex>
      <Box />
    </Flex>
  );
};

export default Lobby;
