import {
  Tab,
  TabList,
  TabListProps,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';

import { ISettingsData } from '../../../../shared/types/settings';
import { ICardsData } from '../../../../shared/types/session/card';

import Settings from '../../containers/Settings/Settings';
import GameCards from '../../containers/SettingsGameCards/SettingsGameCards';
import InputTimer, { ITimer } from '../../containers/InputTimer/InputTimer';
import GameCardBacks, {
  ICardbacksData,
} from '../../containers/SettingsCardBacks/SettingsCardBacks';
import { getBorderStyles } from '../../constants';
import { ReactComponent as UndrawTimeManagment } from '../../assets/images/undraw/time-managment.svg';

const tabStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  w: '100%',
  h: '100%',
  position: 'relative',
} as TabListProps;

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

  const cMode = useColorMode();

  const [isLargerThen500] = useMediaQuery('(min-width: 500px)');

  return (
    <Tabs
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      isManual
      variant="enclosed"
      px={1.5}
    >
      <TabList
        display="flex"
        justifyContent="flex-start"
        w="100%"
        flexWrap="wrap"
      >
        <Tab>Common Settings</Tab>
        {isTimerNeeded && <Tab>Timer</Tab>}
        <Tab>Game Cards</Tab>
        <Tab>Card Backs</Tab>
      </TabList>
      <TabPanels
        minH="330px"
        flexGrow={1}
        display="flex"
        w="100%"
        {...getBorderStyles(cMode.colorMode)}
        overflowX="hidden"
      >
        <TabPanel {...tabStyles}>
          <Settings {...props} />
        </TabPanel>
        {isTimerNeeded && (
          <TabPanel {...tabStyles} justifyContent="space-around" gridGap={4}>
            <InputTimer {...timerData} />
            {isLargerThen500 && (
              <UndrawTimeManagment style={{ maxHeight: '350px' }} />
            )}
          </TabPanel>
        )}
        <TabPanel {...tabStyles}>
          <GameCards {...cardsData} />
        </TabPanel>
        <TabPanel {...tabStyles}>
          <GameCardBacks {...cardbackData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SettingsTabs;
