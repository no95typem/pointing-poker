import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import UserCards from '../../containers/UserCards/UserCards';

import { IUserCards } from '../../../../shared/types/session/member';

const UserCardsTabs = (props: IUserCards): JSX.Element => {
  return (
    <Tabs isManual variant="enclosed" w="100%">
      <TabList
        justifyContent={['center', 'center', 'center', 'center', 'flex-start']}
      >
        <Tab>Players</Tab>
        <Tab>Spectators</Tab>
      </TabList>
      <TabPanels w="100%">
        <TabPanel w="100%" display="flex" justifyContent="center">
          <UserCards {...{ ...props, isVotersView: true }} />
        </TabPanel>
        <TabPanel w="100%" display="flex" justifyContent="center">
          <UserCards {...props} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserCardsTabs;
