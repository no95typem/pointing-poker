import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Issue } from '../../../../shared/types/session/issue/issue';
import { ISessionGameState } from '../../../../shared/types/session/state/session-state';
import { getBorderStyles } from '../../constants';
import { ReactComponent as UndrawDrag } from '../../assets/images/undraw/drag.svg';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';

export interface IIssuesTabs {
  list: Issue[];
  gameState?: ISessionGameState;
  renderIssueCard: (issue: Issue) => JSX.Element;
  renderBasicIssueCard: (issue: Issue) => JSX.Element;
  justifyTabs?: 'start' | 'center';
  isSynced: boolean;
  isPlayerDealer?: boolean;
}

const IssuesTabs = (props: IIssuesTabs): JSX.Element => {
  const {
    isPlayerDealer,
    isSynced,
    list,
    renderIssueCard,
    renderBasicIssueCard,
    gameState,
  } = props;

  const cMode = useColorMode();

  const ref = useRef<HTMLDivElement>(null!);

  const [h, setH] = useState('200px');

  const updateH = useCallback(() => {
    if (ref?.current) {
      const style = getComputedStyle(ref.current);

      if (style.height !== h) setH(style.height);
    }
  }, [h, setH, ref]);

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
    // eslint-disable-next-line
  }, []);

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
        position="relative"
        overflow="hidden"
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
          {isPlayerDealer &&
            (!gameState ||
              gameState?.roundState === ROUND_STATES.AWAIT_START) && (
              <Flex
                zIndex="-1"
                position="absolute"
                bottom="3.5px"
                right="10px"
                align="center"
                justify="center"
                w="100%"
                gridGap={2}
              >
                <Text
                  fontSize="sm"
                  whiteSpace="pre-line"
                  fontFamily="handwrite"
                  textAlign="center"
                  w="fit-content"
                >
                  {`Use drag and drop
                to change the order`}
                </Text>
                <UndrawDrag width="100px" opacity="0.7" />
              </Flex>
            )}
        </TabPanel>
        <TabPanel overflowY="auto" h={h}>
          <Flex w="100%" direction="column" gridGap={4}>
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
