import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';

const GameControlButtons = (): JSX.Element => {
  return (
    <Stack direction="row" w="100%" align="center" justify="space-between">
      <Button
        colorScheme="facebook"
        w="130px"
        variant="outline"
        onClick={SERVER_ADAPTER.exitGame}
      >
        Cancel Game
      </Button>
      <Button
        colorScheme="facebook"
        w="130px"
        variant="solid"
        onClick={SERVER_ADAPTER.startGame}
      >
        Start Game
      </Button>
    </Stack>
  );
};

export default GameControlButtons;
