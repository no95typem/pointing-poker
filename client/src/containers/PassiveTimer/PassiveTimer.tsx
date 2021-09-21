import React from 'react';

import { FormControl, FormLabel, Stack, Text } from '@chakra-ui/react';

import InputNumber from '../../components/InputNumber/InputNumber';

interface ITimer {
  time: number;
}

const PassiveTimer = (props: ITimer): JSX.Element => {
  const timeInS = props.time / 1000;

  const minutes = Math.trunc(timeInS / 60);

  const seconds = Math.trunc(timeInS % 60);

  console.log(seconds);

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
        <InputNumber value={minutes} units="minutes" />

        <Text>:</Text>

        <InputNumber value={seconds} units="seconds" />
      </Stack>
    </FormControl>
  );
};

export default PassiveTimer;
