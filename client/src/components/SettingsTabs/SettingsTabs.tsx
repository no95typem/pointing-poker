import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { ISettingsData } from '../../../../shared/types/settings';
import { ICardsData } from '../../../../shared/types/session/card';

import Settings from '../../containers/Settings/Settings';
import GameCards from '../../containers/GameCards/GameCards';
import PassiveTimer from '../../containers/PassiveTimer/PassiveTimer';
import GameCardBacks from '../../containers/GameCardBacks/GameCardBacks';

const SettingsTabs = (props: ISettingsData): JSX.Element => {
  const { localSettings, setLocalSettings } = props;

  const { scoreTypeShort, cards, isTimerNeeded, roundTime } = localSettings;

  const cardsData: ICardsData = {
    cards,
    units: scoreTypeShort,
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
          <GameCardBacks />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SettingsTabs;
