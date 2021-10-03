import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';

import { Issue } from '../../../../shared/types/session/issue/issue';

export interface IIssuesTabs {
  isSynced: boolean;
  list: Issue[];
  renderIssueCard: (issue: Issue) => JSX.Element;
  renderBasicIssueCard: (issue: Issue) => JSX.Element;
  justifyTabs?: 'start' | 'center';
}

const IssuesTabs = (props: IIssuesTabs): JSX.Element => {
  const { isSynced, list, renderIssueCard, renderBasicIssueCard } = props;

  const cMode = useColorMode();

  return (
    <Tabs
      variant="enclosed"
      flexGrow={1}
      w="100%"
      display="flex"
      flexDirection="column"
      overflowY="hidden"
      // colorScheme={cMode.colorMode === 'light' ? 'yellow' : undefined}
    >
      <TabList justifyContent={props.justifyTabs || 'start'}>
        <Tab>Active Issues</Tab>
        <Tab>Closed Issues</Tab>
      </TabList>
      <TabPanels
        w="100%"
        border="1px"
        borderTopRadius="0"
        borderColor={cMode.colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.200'}
        flexGrow={1}
        overflowY="auto"
        opacity={isSynced ? '1' : '0.5'}
      >
        <TabPanel>
          <Droppable droppableId="issues">
            {({ droppableProps, innerRef, placeholder }) => (
              <Flex
                w="100%"
                direction="column"
                gridGap={4}
                {...droppableProps}
                ref={innerRef}
              >
                {list
                  .filter(issue => !issue.closed)
                  .map(issue => renderIssueCard(issue))}

                {placeholder}
              </Flex>
            )}
          </Droppable>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" direction="column" gridGap={2}>
            {list
              .filter(issue => issue.closed)
              .map(issue => renderBasicIssueCard(issue))}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default IssuesTabs;
