import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import UseSessionData from '../../hooks/useSessionData';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';

import GameControlButtons from '../../containers/GameControlButtons/GameControlButtons';
import GameTimer from '../../containers/GameTimer/GameTimer';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import IssueCards from '../../containers/IssuesCards/IssuesCards';

import DealerPlate from '../../components/DealerPlate/DealerPlate';
import UserCardsTabs from '../../components/UserCardsTabs/UserCardsTabs';
import GameInfo, { IGameInfo } from '../../containers/GameInfo/GameInfo';

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
    isPlayerSpectator,
  } = sessionData;

  const { gameState, gameData } = gameStateData;

  console.log(session);

  const isRoundStarted = !!(
    gameState && gameState.roundState === ROUND_STATES.IN_PROCESS
  );

  const gameInfo: IGameInfo = {
    gameData,
    isPlayerSpectator,
    gameState,
    issues: issuesData.issues.list,
  };

  return (
    <Box maxW="1200px" w={['100vw', '90%']} h="100%" m="0 auto" p="5px">
      <EditableHeader {...sessionNameData} />

      <Stack
        direction="row"
        justify={['center', 'center', 'center', 'space-between']}
        align="center"
        wrap="wrap"
      >
        <DealerPlate dealerMemberData={dealerData} />
        {isRoundStarted && <GameTimer />}
        <GameControlButtons {...gameStateData} />
      </Stack>
      <UserCardsTabs {...membersData} />
      <Stack
        direction="row"
        wrap="wrap"
        style={{ gap: '1vw' }}
        justify={['center', 'center', 'center', 'center', 'space-between']}
      >
        <IssueCards {...issuesData} />
        <GameInfo {...gameInfo} />
      </Stack>
    </Box>
  );
};

export default Game;
