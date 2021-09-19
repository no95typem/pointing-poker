import React from 'react';

import { Stack, Heading, Box } from '@chakra-ui/react';
import { LOCALE_US } from '../../locales/locale-us';
import { ISettingsComponent } from '../../../../shared/types/settings';
import Switcher from '../../components/Switcher/Switcher';
import InputText from '../../components/InputText/InputText';
import Timer from '../Timer/Timer';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { setSettings } from '../../redux/slices/settings';
import GameCards from '../GameCards/GameCards';

const Settings = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const localSettings = useTypedSelector(state => state.settings);

  const {
    dealerAsPlayer,
    changingCardInRoundEnd,
    isTimerNeeded,
    scoreType,
    scoreTypeShort,
    roundTime,
  } = localSettings;

  const setLocalSettings = (name: string, value: string | boolean): void => {
    dispatch(setSettings({ ...localSettings, [name]: value }));

    // dispatch(setSettings({ ...localSettings, dealerAsPlayer: false }));

    console.log(localSettings);
  };

  const switchersData: ISettingsComponent[] = [
    {
      name: 'dealerAsPlayer',
      label: LOCALE_US.SETTINGS_IS_DEALER_PLAYER,
      value: dealerAsPlayer,
      onChange: setLocalSettings,
    },
    {
      name: 'changingCardInRoundEnd',
      label: LOCALE_US.SETTINGS_OPEN_CARDS_ON_ROUND_END,
      value: changingCardInRoundEnd,
      onChange: setLocalSettings,
    },
    {
      name: 'isTimerNeeded',
      label: LOCALE_US.SETTINGS_IS_TIMER_ON,
      value: isTimerNeeded,
      onChange: setLocalSettings,
    },
  ];

  const inputsData: ISettingsComponent[] = [
    {
      name: 'scoreType',
      label: LOCALE_US.SETTINGS_SCORE_TYPE,
      value: scoreType,
      onChange: setLocalSettings,
    },
    {
      name: 'scoreTypeShort',
      label: LOCALE_US.SETTINGS_SCORE_TYPE_SHORT,
      value: scoreTypeShort,
      onChange: setLocalSettings,
    },
  ];

  return (
    <Box>
      <Stack direction="column" spacing={5} w="40%" mb="30px">
        <Heading size="md" textAlign="end">
          Game settings:
        </Heading>
        {switchersData.map(switcherData => {
          const { name } = switcherData;

          return <Switcher data={switcherData} key={name} />;
        })}
        {inputsData.map(iputData => {
          const { name } = iputData;

          return <InputText data={iputData} key={name} />;
        })}

        {isTimerNeeded && <Timer time={roundTime || 0} />}
      </Stack>
      <GameCards cards={localSettings.cards} />
    </Box>
  );
};

export default Settings;
