import React, { useEffect, useState } from 'react';

import { FormLabel, Stack, Text, useColorMode } from '@chakra-ui/react';

import { ISettings, SettingsValue } from '../../../../shared/types/settings';
import timerValidation from '../../helpers/timerValidation';

import InputNumber, {
  INumberInput,
} from '../../components/InputNumber/InputNumber';

export interface ITimer {
  settings: ISettings;
  time?: number;
  setLocalSettings?: (name: string, value: SettingsValue) => void;
}

export interface ITimerTabs {
  [key: string]: number;
  minutes: number;
  seconds: number;
}

const InputTimer = (props: ITimer): JSX.Element => {
  const { setLocalSettings, settings, time } = props;

  const { roundTime } = settings;

  const cMode = useColorMode();

  const timeInS = time ? time / 1000 : roundTime / 1000;

  const getMinutes = (): number => {
    return Math.trunc(timeInS / 60);
  };

  const getSeconds = (): number => {
    return Math.trunc(timeInS % 60);
  };

  const initTimer: ITimerTabs = {
    minutes: getMinutes(),
    seconds: getSeconds(),
  };

  const [timer, setTimer] = useState<ITimerTabs>(initTimer);

  useEffect(() => {
    if (!setLocalSettings) return;

    setLocalSettings('roundTime', (timer.minutes * 60 + timer.seconds) * 1000);
  }, [timer, setLocalSettings]);

  const minutes = setLocalSettings ? timer.minutes : getMinutes();

  const seconds = setLocalSettings ? timer.seconds : getSeconds();

  const setTime = (name: string, value: number): void => {
    if (!setLocalSettings || Number.isNaN(value)) return;

    setTimer(prev => ({ ...prev, [name]: value }));
  };

  const validateTime = (units: 'minutes' | 'seconds'): void => {
    if (!setLocalSettings) return;

    setTimeout(() => {
      const validTimer = timerValidation(units, timer);

      setTimer(prev => ({ ...prev, ...validTimer }));
    });
  };

  const inputMinutes: INumberInput = {
    setTime,
    validateTime,
    units: 'minutes',
    value: minutes,
  };

  const inputSeconds: INumberInput = {
    ...inputMinutes,
    units: 'seconds',
    value: seconds,
  };

  return (
    <Stack
      direction="column"
      align="center"
      justify="space-between"
      bg={cMode.colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.50'}
      borderRadius="6px"
      p="10px 10px 0"
      style={{ gap: '10px' }}
      shadow="lg"
    >
      {setLocalSettings && (
        <FormLabel htmlFor="timer" mb="0">
          Round time:
        </FormLabel>
      )}

      <Stack
        id="timer"
        direction="row"
        spacing={3}
        align="center"
        p="5px"
        w="150px"
        height="75px"
      >
        <InputNumber {...inputMinutes} />

        <Text>:</Text>

        <InputNumber {...inputSeconds} />
      </Stack>
    </Stack>
  );
};

export default InputTimer;
