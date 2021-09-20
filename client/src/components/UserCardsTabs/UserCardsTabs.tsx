import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import UserCards from '../../containers/UserCards/UserCards';

import { IUserCards } from '../../../../shared/types/session/member';

const UserCardsTabs = (props: IUserCards): JSX.Element => {
  return (
    <Tabs isManual variant="enclosed">
      <TabList>
        <Tab>All Users</Tab>
        <Tab>Players only</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <UserCards {...props} />
        </TabPanel>
        <TabPanel>
          <UserCards {...{ ...props, isVotersView: true }} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserCardsTabs;
