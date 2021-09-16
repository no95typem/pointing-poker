import React from 'react';

import { FormControl, FormLabel, Stack, Text } from '@chakra-ui/react';

import InputNumber from '../../components/InputNumber/InputNumber';

interface ITimer {
  time: number;
}

const Timer = (props: ITimer): JSX.Element => {
  const { time } = props;

  console.log(time);

  const minutes = Math.trunc(time / 60);

  const seconds = time % 60;

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
        <InputNumber defaultvalue={minutes} units="minutes" />

        <Text>:</Text>

        <InputNumber defaultvalue={seconds} units="seconds" />
      </Stack>
    </FormControl>
  );
};

export default Timer;
