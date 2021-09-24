import React from 'react';
import { Box, Stack } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import UseSessionData from '../../hooks/useSessionData';

import GameControlButtons from '../../containers/GameControlButtons/GameControlButtons';
import DealerPlate from '../../components/DealerPlate/DealerPlate';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import IssueCards from '../../containers/IssuesCards/IssuesCards';
import Settings from '../../containers/Settings/Settings';
import JoinGameLink from '../../containers/JoinGameLink/JoinGameLink';
import UseLocalSettings from '../../hooks/useLocalSettings';
import { IGameStateData } from '../../../../shared/types/session/state/session-state';
import { ISettingsData } from '../../../../shared/types/settings';
import UserCardsTabs from '../../components/UserCardsTabs/UserCardsTabs';

const Lobby = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const localSettings = useTypedSelector(state => state.settings);

  const sessionData = UseSessionData(session);

  const { setLocalSettings } = UseLocalSettings(localSettings);

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
    <Box h="100%" maxW="1200px" w="90%" m="0 auto" p="5px" overflow="hidden">
      <EditableHeader {...sessionNameData} />
      <Stack direction="row" justify="space-between" align="center">
        <DealerPlate dealerMemberData={dealerData} />
        <JoinGameLink link={`${window.location}`} />
        <GameControlButtons {...gameStateLobby} />
      </Stack>
      <UserCardsTabs {...membersData} />
      <Stack direction="row" wrap="wrap" justify="space-between">
        <IssueCards {...issuesData} />
        {isPlayerDealer && <Settings {...settingsData} />}
      </Stack>
    </Box>
  );
};

export default Lobby;
