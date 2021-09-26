import React from 'react';
import { Box, Stack } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import UseSessionData from '../../hooks/useSessionData';
import UseLocalSettings from '../../hooks/useLocalSettings';

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
    <Box maxW="1200px" w="90%" m="0 auto" p="5px" overflow="hidden">
      <EditableHeader {...sessionNameData} />
      <Stack
        direction="row"
        justify="space-between"
        align="center"
        wrap="wrap"
        style={{ gap: '15px' }}
      >
        <DealerPlate dealerMemberData={dealerData} />
        <JoinGameLink link={`${window.location}`} />
        <GameControlButtons {...gameStateLobby} />
      </Stack>
      <UserCardsTabs {...membersData} />
      <Stack direction="row" wrap="wrap" justify="space-between">
        <IssueCards {...issuesData} />
        {isPlayerDealer && <SettingsTabs {...settingsData} />}
      </Stack>
    </Box>
  );
};

export default Lobby;
