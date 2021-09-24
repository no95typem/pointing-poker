import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import { IGameStateData } from '../../../../shared/types/session/state/session-state';
import { CSMsgEndGame } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-end-game';

const GameControlButtons = (props: IGameStateData): JSX.Element => {
  const { isPlayerDealer, setGameSettings, localSettings, gameData } = props;

  const initiateGame = (): void => {
    localSettings && setGameSettings(localSettings);

    SERVER_ADAPTER.startGame();
  };

  const finishGame = (): void => {
    const endGame = new CSMsgEndGame();

    SERVER_ADAPTER.send(endGame);
  };

  return (
    <Stack direction="row" align="center" justify="space-between">
      <Button
        colorScheme="facebook"
        w="130px"
        variant="outline"
        onClick={SERVER_ADAPTER.exitGame}
      >
        {isPlayerDealer ? 'Cancel Game' : 'Leave Game'}
      </Button>
      {isPlayerDealer && (
        <Button
          colorScheme="facebook"
          w="130px"
          variant="solid"
          visibility={isPlayerDealer ? 'visible' : 'hidden'}
          onClick={gameData.isGameStage ? finishGame : initiateGame}
        >
          {gameData.isGameStage ? 'Finish Game' : 'Start Game'}
        </Button>
      )}
    </Stack>
  );
};

export default GameControlButtons;
