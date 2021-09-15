import React from 'react';

import { Stack, Heading, Box } from '@chakra-ui/react';
import { LOCALE_US } from '../../locales/locale-us';
import {
  ISettingsComponent,
  ISettings,
} from '../../../../shared/types/settings';
import Switcher from '../../components/Switcher/Switcher';
import InputText from '../../components/InputText/InputText';
import Timer from '../Timer/Timer';

const Settings = (props: ISettings): JSX.Element => {
  const {
    dealerAsPlayer,
    changingCardInRoundEnd,
    isTimerNeeded,
    scoreType,
    scoreTypeShort,
    roundTime,
  } = props;
  const switchersData: ISettingsComponent[] = [
    {
      name: 'dealerAsPlayer',
      label: LOCALE_US.SETTINGS_IS_DEALER_PLAYER,
      value: dealerAsPlayer,
    },
    {
      name: 'changingCardInRoundEnd',
      label: LOCALE_US.SETTINGS_OPEN_CARDS_ON_ROUND_END,
      value: changingCardInRoundEnd,
    },
    {
      name: 'isTimerNeeded',
      label: LOCALE_US.SETTINGS_IS_TIMER_ON,
      value: isTimerNeeded,
    },
  ];

  const inputsData: ISettingsComponent[] = [
    {
      name: 'scoreType',
      label: LOCALE_US.SETTINGS_SCORE_TYPE,
      value: scoreType,
    },
    {
      name: 'scoreTypeShort',
      label: LOCALE_US.SETTINGS_SCORE_TYPE_SHORT,
      value: scoreTypeShort,
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

        {isTimerNeeded && <Timer time={roundTime} />}
      </Stack>
    </Box>
  );
};

export default Settings;
