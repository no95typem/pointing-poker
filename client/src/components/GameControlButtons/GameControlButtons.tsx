import React from 'react';

import { Button, Stack } from '@chakra-ui/react';

const GameControlButtons = (): JSX.Element => {
  return (
    <Stack direction="row" w="100%" align="center" justify="space-between">
      <Button
        colorScheme="facebook"
        w="130px"
        variant="outline"
        // onClick={onClick}
      >
        Cancel Game
      </Button>
      <Button
        colorScheme="facebook"
        w="130px"
        variant="solid"
        // onClick={onClick}
      >
        Start Game
      </Button>
    </Stack>
  );
};

export default GameControlButtons;
