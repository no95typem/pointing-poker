import React from 'react';

import { Box, ChakraProps, Stack, useRadioGroup } from '@chakra-ui/react';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

import {
  IIssueData,
  IIssues,
  Issue,
} from '../../../../shared/types/session/issue/issue';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import { showIssueImportDialog } from '../../helpers/showIssueUploadDialog';

import IssueCard from '../../components/IssueCard/IssueCard';
import IssueModal from '../../components/IssueModal/IssueModal';
import NewIssueButton from '../../components/NewElementButton/NewElementButton';
import ChakraLoader from '../../components/Loader/ChakraLoader';
import SessionItemRadioCard from '../../components/SessionItemRadioCard/SessionItemRadioCard';
import IssueStatisticModal from '../../components/IssueStatisticModal/IssueStatisticModal';
import RoundControlButtons from '../RoundControlButtons/RoundControlButtons';

const IssueCardsView = (props: IIssues): JSX.Element => {
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

  const IssueStackStyle: ChakraProps = {
    w: '280px',
    alignItems: 'center',
    flexDirection: 'column',
    opacity: isSynced ? 1 : 0.5,
  };

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

    return (
      <Stack
        opacity={issue.closed ? '0.5' : '1'}
        bg={issue.closed ? 'gray.400' : 'unset'}
        w="280px"
        style={{
          marginTop: '0',
        }}
        key={`${id}-wrap`}
      >
        <IssueCard {...setIssueData(issue)} key={id} />
      </Stack>
    );
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

  const renderNewIssueButton = (): JSX.Element => {
    if (!isPlayerDealer || !isSynced) return <></>;

    return <NewIssueButton description="Create issue" openModal={openModal} />;
  };

  const renderUploadIssueButton = (): JSX.Element => {
    if (!isPlayerDealer || !isSynced) return <></>;

    return (
      <NewIssueButton
        description="Upload issues"
        openModal={showIssueImportDialog}
      />
    );
  };

  return (
    <DragDropContext onDragEnd={handleDnd}>
      <Box mb="50px" maxH="440px" overflowY="hidden" position="relative">
        {renderRoundControlButtons()}

        <Stack spacing="3" p="5px" maxH={['250px', '380px']} overflowY="scroll">
          <Stack {...IssueStackStyle}>
            {renderUploadIssueButton()}

            {renderNewIssueButton()}

            {list
              .filter(issue => issue.closed)
              .map(issue => renderBasicIssueCard(issue))}
          </Stack>

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
        <IssueModal issue={modal} />

        {statisticModal && <IssueStatisticModal {...statisticModal} />}
        {!isSynced && <ChakraLoader />}
      </Box>
    </DragDropContext>
  );
};

export default IssueCardsView;
