import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

import NewGameCardButton from '../../components/NewElementButton/NewElementButton';

const GameCardBacks = (): JSX.Element => {
  return (
    <Box>
      <Stack direction="row" w="100" justify="center">
        <NewGameCardButton openModal={() => {}} description="Add Card Back" />
      </Stack>
    </Box>
  );
};

export default GameCardBacks;
