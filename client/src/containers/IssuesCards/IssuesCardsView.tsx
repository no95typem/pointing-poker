import React from 'react';

import { Box, Flex, Stack, useRadioGroup } from '@chakra-ui/react';

import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import {
  IIssueData,
  IIssues,
  Issue,
} from '../../../../shared/types/session/issue/issue';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';

import IssueCard from '../../components/IssueCard/IssueCard';
import IssueModal from '../../components/IssueModal/IssueModal';
import ChakraLoader from '../../components/Loader/ChakraLoader';
import SessionItemRadioCard from '../../components/SessionItemRadioCard/SessionItemRadioCard';
import IssueStatisticModal from '../../components/IssueStatisticModal/IssueStatisticModal';
import RoundControlButtons from '../RoundControlButtons/RoundControlButtons';
import NewIssuesButtons from '../NewIssuesButtons/NewIssuesButtons';
import IssuesTabs, {
  IIssuesTabs,
} from '../../components/IssuesTabs/IssuesTabs';

const IssueCardsView = (
  props: IIssues & { justifyTabs?: 'start' | 'center' },
): JSX.Element => {
  const { issues, modal } = props;

  const { list, isSynced } = issues;

  const {
    openModal,
    removeIssue,
    isPlayerDealer,
    gameState,
    statisticModal,
    issuesDndChange,
  } = modal;

  const { getRadioProps } = useRadioGroup({
    name: 'issues',
    value: String(gameState?.currIssueId),
  });

  const handleDnd = (result: DropResult): void => {
    if (!result.destination) return;

    const { source, destination } = result;

    issuesDndChange(source.index, destination.index);
  };

  const setIssueData = (issue: Issue): IIssueData => {
    let issueData: IIssueData = {
      isPlayerDealer,
      openModal,
      removeIssue,
      issue,
      settings: statisticModal.settings,
    };

    if (gameState && statisticModal) {
      issueData = { ...issueData, openStatisticModal: statisticModal.onOpen };
    }

    return issueData;
  };

  const renderRoundControlButtons = (): JSX.Element => {
    if (!gameState || !isPlayerDealer || !gameState.currIssueId || !isSynced)
      return <></>;

    return <RoundControlButtons {...gameState} />;
  };

  const renderBasicIssueCard = (issue: Issue): JSX.Element => {
    const id = issue.id;

    return <IssueCard {...setIssueData(issue)} key={id} />;
  };

  const renderDealerDraggableCard = (issue: Issue): JSX.Element => {
    const id = String(issue.id);

    return (
      <Draggable
        key={`${id}-drag`}
        draggableId={id}
        index={list.indexOf(issue)}
      >
        {({ innerRef, draggableProps, dragHandleProps }) => (
          <Box
            key={`${id}-radioWrap`}
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
          >
            {renderDealerRadioCard(issue)}
          </Box>
        )}
      </Draggable>
    );
  };
  const renderDealerRadioCard = (issue: Issue): JSX.Element => {
    const id = String(issue.id);

    const radio = (getRadioProps as (obj: { value: string }) => any)({
      value: id,
    });

    return (
      <SessionItemRadioCard key={`${id}-radio`} {...radio}>
        {renderBasicIssueCard(issue)}
      </SessionItemRadioCard>
    );
  };

  const renderUserHighlightedCard = (issue: Issue): JSX.Element => {
    const id = issue.id;

    return (
      <Stack bg="teal.600" color="white" key={`${id}-checked`}>
        {renderBasicIssueCard(issue)}
      </Stack>
    );
  };

  const renderIssueCard = (issue: Issue): JSX.Element => {
    if (isPlayerDealer) {
      if (
        (gameState && gameState.roundState === ROUND_STATES.AWAIT_START) ||
        !gameState
      ) {
        return renderDealerDraggableCard(issue);
      } else {
        return renderDealerRadioCard(issue);
      }
    } else {
      if (gameState && gameState.currIssueId === issue.id) {
        return renderUserHighlightedCard(issue);
      } else {
        return renderBasicIssueCard(issue);
      }
    }
  };

  const issueTabsData: IIssuesTabs = {
    isSynced,
    list,
    justifyTabs: props.justifyTabs,
    renderBasicIssueCard,
    renderIssueCard,
  };

  return (
    <DragDropContext onDragEnd={handleDnd}>
      <Flex
        position="relative"
        direction="column"
        gridGap={4}
        h="100%"
        w="100%"
      >
        {renderRoundControlButtons()}
        {isPlayerDealer && isSynced && <NewIssuesButtons modal={openModal} />}
        {<IssuesTabs {...issueTabsData} />}
        <IssueModal issue={modal} />
        {statisticModal && <IssueStatisticModal {...statisticModal} />}
        {!isSynced && <ChakraLoader />}
      </Flex>
    </DragDropContext>
  );
};

export default IssueCardsView;
