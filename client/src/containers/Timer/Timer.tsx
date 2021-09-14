import React from 'react';

import { FormControl, FormLabel, Stack, Text } from '@chakra-ui/react';

import InputNumber from '../../components/InputNumber/InputNumber';

const Timer = (): JSX.Element => {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel htmlFor="timer" mb="0">
        Round time:
      </FormLabel>

      <Stack
        id="timer"
        shadow="lg"
        direction="row"
        spacing={3}
        align="center"
        p="5px"
        w="150px"
        height="75px"
      >
        <InputNumber defaultvalue={2} units="minutes" />

        <Text>:</Text>

        <InputNumber defaultvalue={20} units="seconds" />
      </Stack>
    </FormControl>
  );
};

export default Timer;
