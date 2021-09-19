import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';

interface IAccessData {
  isPlayerDealer: boolean;
}

const GameControlButtons = (props: IAccessData): JSX.Element => {
  const { isPlayerDealer } = props;

  return (
    <Stack direction="row" w="100%" align="center" justify="space-between">
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
          onClick={SERVER_ADAPTER.startGame}
        >
          Start Game
        </Button>
      )}
    </Stack>
  );
};

export default GameControlButtons;
