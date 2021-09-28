import React from 'react';
import {
  ChakraProps,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import { Issue } from '../../../../../../shared/types/session/issue/issue';

export interface IIssuesTabs {
  isSynced: boolean;
  list: Issue[];
  renderIssueCard: (issue: Issue) => JSX.Element;
  renderBasicIssueCard: (issue: Issue) => JSX.Element;
}

const IssuesTabs = (props: IIssuesTabs): JSX.Element => {
  const { isSynced, list, renderIssueCard, renderBasicIssueCard } = props;

  const TabPanelStyle: ChakraProps = {
    maxH: '280px',
    overflowY: 'hidden',
  };

  const IssueStackWrapStyle: ChakraProps = {
    maxH: '280px',
    overflowY: 'scroll',
    p: '10px 0 20px',
  };

  const IssueStackStyle: ChakraProps = {
    w: '280px',
    alignItems: 'center',
    flexDirection: 'column',
    opacity: isSynced ? 1 : 0.5,
  };

  return (
    <Tabs isManual variant="enclosed" mb="10px">
      <TabList>
        <Tab>Active Issues</Tab>
        <Tab>Closed Issues</Tab>
      </TabList>
      <TabPanels maxW="100vw">
        <TabPanel {...TabPanelStyle}>
          <Stack {...IssueStackWrapStyle}>
            <Droppable droppableId="issues">
              {({ droppableProps, innerRef, placeholder }) => (
                <Stack {...droppableProps} ref={innerRef} {...IssueStackStyle}>
                  {list
                    .filter(issue => !issue.closed)
                    .map(issue => renderIssueCard(issue))}

                  {placeholder}
                </Stack>
              )}
            </Droppable>
          </Stack>
        </TabPanel>
        <TabPanel {...TabPanelStyle}>
          <Stack {...IssueStackWrapStyle}>
            <Stack {...IssueStackStyle}>
              {list
                .filter(issue => issue.closed)
                .map(issue => renderBasicIssueCard(issue))}
            </Stack>
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default IssuesTabs;
