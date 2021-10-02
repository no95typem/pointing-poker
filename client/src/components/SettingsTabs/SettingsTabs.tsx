import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { ISettingsData } from '../../../../shared/types/settings';
import { ICardsData } from '../../../../shared/types/session/card';

import Settings from '../../containers/Settings/Settings';
import GameCards from '../../containers/SettingsGameCards/SettingsGameCards';
import InputTimer, { ITimer } from '../../containers/InputTimer/InputTimer';
import GameCardBacks, {
  ICardbacksData,
} from '../../containers/SettingsCardBacks/SettingsCardBacks';

const SettingsTabs = (props: ISettingsData): JSX.Element => {
  const { localSettings, setLocalSettings } = props;

  const {
    scoreTypeShort,
    cards,
    isTimerNeeded,
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

  const timerData: ITimer = { settings: localSettings, setLocalSettings };

  return (
    <Tabs
      w="100%"
      isManual
      variant="enclosed"
      style={{ marginBottom: '10px', marginInlineStart: '0' }}
    >
      <TabList display="flex" justifyContent="flex-start" w="100%">
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
            <InputTimer {...timerData} />
          </TabPanel>
        )}
        <TabPanel w="100%">
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
