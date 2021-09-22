import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import UserCards from '../../containers/UserCards/UserCards';

import { IUserCards } from '../../../../shared/types/session/member';

const UserCardsTabs = (props: IUserCards): JSX.Element => {
  return (
    <Tabs isManual variant="enclosed">
      <TabList>
        <Tab>Players only</Tab>
        <Tab>All Users</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <UserCards {...{ ...props, isVotersView: true }} />
        </TabPanel>
        <TabPanel>
          <UserCards {...props} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserCardsTabs;
