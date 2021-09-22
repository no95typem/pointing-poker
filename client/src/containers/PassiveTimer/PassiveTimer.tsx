import React from 'react';

import { FormLabel, Stack, Text } from '@chakra-ui/react';

import InputNumber from '../../components/InputNumber/InputNumber';
import { useTypedSelector } from '../../redux/store';
import { SESSION_STAGES } from '../../../../shared/types/session/state/stages';

interface ITimer {
  time: number;
}

const PassiveTimer = (props: ITimer): JSX.Element => {
  const timeInS = props.time / 1000;

  const minutes = Math.trunc(timeInS / 60);

  const seconds = Math.trunc(timeInS % 60);

  const stage = useTypedSelector(state => state.session.stage);

  const isLobbyStage = stage === SESSION_STAGES.LOBBY;

  console.log(seconds);

  return (
    <Stack display="flex" align="center" justify="space-between">
      {isLobbyStage && (
        <FormLabel htmlFor="timer" mb="0">
          Round time:
        </FormLabel>
      )}

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
    </Stack>
  );
};

export default PassiveTimer;
