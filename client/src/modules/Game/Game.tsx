import React from 'react';

import { Box, Button, Stack } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

import UseSessionData from '../../hooks/useSessionData';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import { CSMsgEndGame } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-end-game';
import { SERVER_ADAPTER } from '../ServerAdapter/serverAdapter';

import GameControlButtons from '../../containers/GameControlButtons/GameControlButtons';
import GameTimer from '../../containers/GameTimer/GameTimer';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import IssueCards from '../../containers/IssuesCards/IssuesCards';
import GameCardsRound from '../../containers/GameCardsRound/GameCardsRound';

import DealerPlate from '../../components/DealerPlate/DealerPlate';
import UserCardsTabs from '../../components/UserCardsTabs/UserCardsTabs';

const Game = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = UseSessionData(session);

  if (!sessionData) return <></>;

  const finishGame = (): void => {
    const endGame = new CSMsgEndGame();

    SERVER_ADAPTER.send(endGame);
  };

  const {
    dealerData,
    membersData,
    sessionNameData,
    issuesData,
    gameStateData,
    isPlayerSpectator,
    isPlayerDealer,
  } = sessionData;

  const { gameState, gameData } = gameStateData;

  console.log(session);

  const isRoundStarted = !!(
    gameState && gameState.roundState === ROUND_STATES.IN_PROCESS
  );

  return (
    <Box minH="100vh" maxW="1440px" w="90%" m="0 auto" p="5px">
      <Stack direction="row" justify="space-between" align="center">
        <EditableHeader {...sessionNameData} />

        {isPlayerDealer && <Button onClick={finishGame}>End Game</Button>}
      </Stack>
      <Stack direction="row" justify="space-between" align="center">
        <DealerPlate dealerMemberData={dealerData} />
        {isRoundStarted && <GameTimer />}
        <GameControlButtons {...gameStateData} />
      </Stack>
      <UserCardsTabs {...membersData} />
      <Stack direction="row" justify="space-between" align="center">
        <IssueCards {...issuesData} />
        {isRoundStarted && !isPlayerSpectator && (
          <GameCardsRound {...gameData} />
        )}
      </Stack>
    </Box>
  );
};

export default Game;
