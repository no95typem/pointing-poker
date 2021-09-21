import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import { ILobbyGameStateData } from '../../../../shared/types/session/state/session-state';

const GameControlButtons = (props: ILobbyGameStateData): JSX.Element => {
  const { isPlayerDealer, setGameSettings, localSettings, isGameStage } = props;

  const initiateGame = (): void => {
    localSettings && setGameSettings(localSettings);

    SERVER_ADAPTER.startGame();
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
          visibility={isPlayerDealer && !isGameStage ? 'visible' : 'hidden'}
          onClick={initiateGame}
        >
          Start Game
        </Button>
      )}
    </Stack>
  );
};

export default GameControlButtons;
