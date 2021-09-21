import React from 'react';
import { Box, Stack } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import UseSessionData from '../../hooks/useSessionData';

import GameControlButtons from '../../containers/GameControlButtons/GameControlButtons';
import DealerPlate from '../../components/DealerPlate/DealerPlate';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';

import IssueCards from '../../containers/IssuesCards/IssuesCards';
import UserCardsTabs from '../../components/UserCardsTabs/UserCardsTabs';

const Game = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = UseSessionData(session);

  if (!sessionData) return <></>;

  const {
    dealerData,
    membersData,
    sessionNameData,
    issuesData,
    gameStateData,
  } = sessionData;

  console.log(session);

  return (
    <Box minH="100vh" maxW="1440px" w="90%" m="0 auto" p="5px">
      <EditableHeader {...sessionNameData} />
      <Stack direction="row" justify="space-between" align="center">
        <DealerPlate dealerMemberData={dealerData} />
        <GameControlButtons {...gameStateData} />
      </Stack>
      <UserCardsTabs {...membersData} />
      <IssueCards {...issuesData} />
    </Box>
  );
};

export default Game;
