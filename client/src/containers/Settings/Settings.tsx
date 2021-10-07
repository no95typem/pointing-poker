import { Flex } from '@chakra-ui/react';

import { LOCALE_US } from '../../locales/locale-us';
import {
  ISettingsComponent,
  ISettingsData,
} from '../../../../shared/types/settings';

import Switcher from '../../components/Switcher/Switcher';
import InputText from '../../components/InputText/InputText';
import { ReactComponent as UndrawPersoalSettings } from '../../assets/images/undraw/personal-settings.svg';

const Settings = (props: ISettingsData): JSX.Element => {
  const { localSettings, setLocalSettings } = props;

  const {
    isDealerPlayer,
    isCardShownOnRoundEnd,
    isPlayerCanReselectCard,
    isTimerNeeded,
    isAutoAdmit,
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
    {
      name: 'isAutoAdmit',
      label: LOCALE_US.SETTINGS_IS_AUTO_ADMIT,
      value: isAutoAdmit,
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
    <Flex
      direction="column"
      gridGap={4}
      w="100%"
      h="100%"
      justify="center"
      position="relative"
    >
      {switchersData.map(switcherData => {
        const { name } = switcherData;

        return <Switcher data={switcherData} key={name} />;
      })}

      {inputsData.map(inputData => {
        const { name } = inputData;

        return <InputText data={inputData} key={name} />;
      })}
      <UndrawPersoalSettings
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '0%',
          transform: 'translate(-30%, 0%)',
          maxHeight: '230px',
          maxWidth: '90%',
          zIndex: -1,
          opacity: '0.7',
        }}
      />
    </Flex>
  );
};

export default Settings;
