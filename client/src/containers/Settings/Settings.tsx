import React from 'react';

import { Stack, Heading, Box } from '@chakra-ui/react';
import { LOCALE_US } from '../../locales/locale-us';
import { ISettingsComponent } from '../../../../shared/types/settings';
import Switcher from '../../components/Switcher/Switcher';
import InputText from '../../components/InputText/InputText';
import Timer from '../Timer/Timer';

const Settings = (): JSX.Element => {
  const switchersData: ISettingsComponent[] = [
    {
      name: 'dealerPlayer',
      label: LOCALE_US.SETTINGS_IS_DEALER_PLAYER,
    },
    {
      name: 'openCardsOnRoundEnd',
      label: LOCALE_US.SETTINGS_OPEN_CARDS_ON_ROUND_END,
    },
    {
      name: 'isTimerOn',
      label: LOCALE_US.SETTINGS_IS_TIMER_ON,
    },
  ];

  const inputsData: ISettingsComponent[] = [
    {
      name: 'scoreType',
      label: LOCALE_US.SETTINGS_SCORE_TYPE,
    },
    {
      name: 'scoreTypeSort',
      label: LOCALE_US.SETTINGS_SCORE_TYPE_SHORT,
    },
  ];

  return (
    <Box mb="30px">
      <Stack direction="column" spacing={5} w="40%">
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
        <Timer />
      </Stack>
    </Box>
  );
};

export default Settings;
