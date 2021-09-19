import React from 'react';
import { Box } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import UseSessionData from '../../hooks/UseSessionData/UseSessionData';

import GameControlButtons from '../../components/GameControlButtons/GameControlButtons';
import DealerPlate from '../../components/DealerPlate/DealerPlate';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import UserCards from '../../containers/UserCards/UserCards';
import IssueCards from '../../containers/IssuesCards/IssuesCards';
import Settings from '../../containers/Settings/Settings';
import JoinGameLink from '../../containers/JoinGameLink/JoinGameLink';

const Lobby = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = UseSessionData(session);

  if (!sessionData) return <></>;

  const {
    dealerData,
    membersData,
    sessionNameData,
    issuesData,
    isPlayerDealer,
  } = sessionData;

  return (
    <Box minH="100vh" maxW="1440px" w="90%" m="0 auto" p="5px">
      <EditableHeader {...sessionNameData} />
      <DealerPlate dealerMemberData={dealerData} />
      <JoinGameLink link={`${window.location}`} />
      <GameControlButtons isPlayerDealer={isPlayerDealer} />
      <UserCards {...membersData} />
      <IssueCards {...issuesData} />
      {isPlayerDealer && <Settings />}
    </Box>
  );
};

export default Lobby;
