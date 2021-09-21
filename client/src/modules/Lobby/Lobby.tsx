import React from 'react';
import { Box } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import UseSessionData from '../../hooks/UseSessionData/UseSessionData';

import GameControlButtons from '../../containers/GameControlButtons/GameControlButtons';
import DealerPlate from '../../components/DealerPlate/DealerPlate';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import UserCards from '../../containers/UserCards/UserCards';
import IssueCards from '../../containers/IssuesCards/IssuesCards';
import Settings from '../../containers/Settings/Settings';
import JoinGameLink from '../../containers/JoinGameLink/JoinGameLink';
import UseLocalSettings from '../../hooks/UseLocalSettings/UseLocalSettings';
import { ILobbyGameStateData } from '../../../../shared/types/session/state/session-state';
import { ISettingsData } from '../../../../shared/types/settings';

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

  const gameStateLobby: ILobbyGameStateData = {
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
    <Box
      minH="100vh"
      maxW="1200px"
      w="90%"
      m="0 auto"
      p="5px"
      overflow="hidden"
    >
      <EditableHeader {...sessionNameData} />
      <DealerPlate dealerMemberData={dealerData} />
      <JoinGameLink link={`${window.location}`} />
      <GameControlButtons {...gameStateLobby} />
      <UserCards {...membersData} />
      <IssueCards {...issuesData} />
      {isPlayerDealer && <Settings {...settingsData} />}
    </Box>
  );
};

export default Lobby;
