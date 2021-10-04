import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';

import UserCards from '../../containers/UserCards/UserCards';

import { IUserCards } from '../../../../shared/types/session/member';

const UserCardsTabs = (props: IUserCards): JSX.Element => {
  const [isLargerThen370] = useMediaQuery('(min-width: 370px)');

  return (
    <Tabs isManual variant="enclosed" w="100%">
      <TabList>
        <Tab>Players</Tab>
        <Tab>Spectators</Tab>
      </TabList>
      <TabPanels w="100%" py={isLargerThen370 ? undefined : '15px'}>
        <TabPanel w="100%" display="flex" justifyContent="center" h="104px">
          <UserCards {...{ ...props, isVotersView: true }} />
        </TabPanel>
        <TabPanel w="100%" display="flex" justifyContent="center" h="104px">
          <UserCards {...props} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserCardsTabs;
