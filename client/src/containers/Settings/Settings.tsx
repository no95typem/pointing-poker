import React from 'react';

import { Stack, Heading, Box } from '@chakra-ui/react';
import { LOCALE_US } from '../../locales/locale-us';
import {
  ISettingsComponent,
  ISettingsData,
} from '../../../../shared/types/settings';
import Switcher from '../../components/Switcher/Switcher';
import InputText from '../../components/InputText/InputText';

const Settings = (props: ISettingsData): JSX.Element => {
  const { localSettings, setLocalSettings } = props;

  const {
    isDealerPlayer,
    isCardShownOnRoundEnd,
    isPlayerCanReselectCard,
    isTimerNeeded,
    scoreType,
    scoreTypeShort,
  } = localSettings;

  const switchersData: ISettingsComponent[] = [
    {
      name: 'isDealerPlayer',
      label: LOCALE_US.SETTINGS_IS_DEALER_PLAYER,
      value: isDealerPlayer,
      onChange: setLocalSettings,
    },
    {
      name: 'isPlayerCanReselectCard',
      label: LOCALE_US.SETTINGS_IS_PLAYER_CAN_RESELECT_CARD,
      value: isPlayerCanReselectCard,
      onChange: setLocalSettings,
    },
    {
      name: 'isTimerNeeded',
      label: LOCALE_US.SETTINGS_IS_TIMER_ON,
      value: isTimerNeeded,
      onChange: setLocalSettings,
    },
    {
      name: 'isCardShownOnRoundEnd',
      label: LOCALE_US.SETTINGS_IS_CARD_SHOWN_ON_ROUND_END,
      value: isCardShownOnRoundEnd,
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
      <Stack direction="column" spacing={5} w="100%" mb="30px">
        <Heading size="md" textAlign="center">
          Game settings:
        </Heading>

        {switchersData.map(switcherData => {
          const { name } = switcherData;

          return <Switcher data={switcherData} key={name} />;
        })}

        {inputsData.map(inputData => {
          const { name } = inputData;

          return <InputText data={inputData} key={name} />;
        })}
      </Stack>
    </Box>
  );
};

export default Settings;
