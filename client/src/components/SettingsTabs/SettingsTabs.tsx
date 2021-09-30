import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { ISettingsData } from '../../../../shared/types/settings';
import { ICardsData } from '../../../../shared/types/session/card';

import Settings from '../../containers/Settings/Settings';
import GameCards from '../../containers/SettingsGameCards/SettingsGameCards';
import PassiveTimer from '../../containers/PassiveTimer/PassiveTimer';
import GameCardBacks, {
  ICardbacksData,
} from '../../containers/SettingsCardBacks/SettingsCardBacks';

const SettingsTabs = (props: ISettingsData): JSX.Element => {
  const { localSettings, setLocalSettings } = props;

  const {
    scoreTypeShort,
    cards,
    isTimerNeeded,
    roundTime,
    cardbacksBase64,
    activeCardbackBase64,
  } = localSettings;

  const cardsData: ICardsData = {
    cards,
    units: scoreTypeShort,
    setLocalSettings,
  };

  const cardbackData: ICardbacksData = {
    cardbacksBase64,
    activeCardbackBase64,
    setLocalSettings,
  };

  return (
    <Tabs
      w={['100%', '100%', '66%']}
      isManual
      variant="enclosed"
      style={{ marginBottom: '10px', marginInlineStart: '0' }}
    >
      <TabList display="flex" justifyContent="flex-start">
        <Tab>Common Settings</Tab>
        {isTimerNeeded && <Tab>Timer</Tab>}
        <Tab>Game Cards</Tab>
        <Tab>Card Backs</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Settings {...props} />
        </TabPanel>
        {isTimerNeeded && (
          <TabPanel>
            <PassiveTimer time={roundTime || 0} />
          </TabPanel>
        )}
        <TabPanel>
          <GameCards {...cardsData} />
        </TabPanel>
        <TabPanel>
          <GameCardBacks {...cardbackData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SettingsTabs;
