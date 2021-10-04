import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Issue } from '../../../../shared/types/session/issue/issue';
import { ISessionGameState } from '../../../../shared/types/session/state/session-state';
import { getBorderStyles } from '../../constants';

export interface IIssuesTabs {
  list: Issue[];
  gameState?: ISessionGameState;
  renderIssueCard: (issue: Issue) => JSX.Element;
  renderBasicIssueCard: (issue: Issue) => JSX.Element;
  justifyTabs?: 'start' | 'center';
  isSynced: boolean;
}

const IssuesTabs = (props: IIssuesTabs): JSX.Element => {
  const { isSynced, list, renderIssueCard, renderBasicIssueCard, gameState } =
    props;

  const cMode = useColorMode();

  const ref = useRef<HTMLDivElement>(null!);

  const [h, setH] = useState('200px');

  const updateH = useCallback(() => {
    const style = getComputedStyle(ref.current);

    if (style.height !== h) setH(style.height);
  }, [h, setH, ref]);

  // eslint-disable react-hooks/exhaustive-deps
  useEffect(() => {
    updateH();
    const listner = () => {
      setH('100px');
      setTimeout(() => {
        updateH();
      });
    };

    window.addEventListener('resize', listner);

    return () => window.removeEventListener('resize', listner);
  }, []);
  // eslint-enable react-hooks/exhaustive-deps

  return (
    <Tabs
      variant="enclosed"
      flexGrow={1}
      w="100%"
      display="flex"
      flexDirection="column"
      overflowY="hidden"
      paddingTop={2}
      px={2}
    >
      <TabList justifyContent={props.justifyTabs || 'start'}>
        <Tab>Active Issues</Tab>
        {gameState && <Tab>Closed Issues</Tab>}
      </TabList>
      <TabPanels
        w="100%"
        h={h}
        {...getBorderStyles(cMode.colorMode)}
        flexGrow={1}
        opacity={isSynced ? '1' : '0.5'}
        ref={ref}
      >
        <TabPanel overflowY="auto" h={h}>
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
        <TabPanel overflowY="auto" h={h}>
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
