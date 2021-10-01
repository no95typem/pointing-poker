import React, { useState } from 'react';

import { FormLabel, Stack, Text } from '@chakra-ui/react';

import { ISettings } from '../../../../shared/types/settings';
import { CardData } from '../../../../shared/types/session/card';

import InputNumber from '../../components/InputNumber/InputNumber';

export interface ITimer {
  settings: ISettings;
  time?: number;
  setLocalSettings?: (
    name: string,
    value: string | boolean | CardData[] | string[] | number,
  ) => void;
}

interface ITimerTabs {
  minutes: number;
  seconds: number;
}

const InputTimer = (props: ITimer): JSX.Element => {
  const { setLocalSettings, settings, time } = props;

  const { roundTime } = settings;

  const timeInS = time ? time / 1000 : roundTime / 1000;

  const getMinutes = (): number => {
    return Math.trunc(timeInS / 60);
  };

  const getSeconds = (): number => {
    return Math.trunc(timeInS % 60);
  };

  const getTimeInMs = (): number => {
    return (timer.minutes * 60 + timer.seconds) * 1000;
  };

  const setTime = (name: string, value: number): void => {
    if (!setLocalSettings) return;

    setTimer({ ...timer, [name]: value });

    setLocalSettings('roundTime', getTimeInMs());
  };

  const initTimer: ITimerTabs = {
    minutes: getMinutes(),
    seconds: getSeconds(),
  };

  const [timer, setTimer] = useState<ITimerTabs>(initTimer);

  const minutes = setLocalSettings ? timer.minutes : getMinutes();

  const seconds = setLocalSettings ? timer.seconds : getSeconds();

  return (
    <Stack display="flex" align="center" justify="space-between">
      {setLocalSettings && (
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
        <InputNumber value={minutes} units="minutes" setTime={setTime} />

        <Text>:</Text>

        <InputNumber value={seconds} units="seconds" setTime={setTime} />
      </Stack>
    </Stack>
  );
};

export default InputTimer;
