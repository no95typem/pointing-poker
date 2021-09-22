import React from 'react';

import { Box, Heading, Stack, useRadioGroup } from '@chakra-ui/react';

import {
  IIssueData,
  IIssues,
  Issue,
} from '../../../../shared/types/session/issue/issue';

import IssueCard from '../../components/IssueCard/IssueCard';
import IssueModal from '../../components/IssueModal/IssueModal';
import NewIssueButton from '../../components/NewIssueButton/NewIssueButton';
import ChakraLoader from '../../components/Loader/ChakraLoader';
import SessionItemRadioCard from '../../components/SessionItemRadioCard/SessionItemRadioCard';
import RoundControlButtons from '../RoundControlButtons/RoundControlButtons';
import IssueStatisticModal from '../../components/IssueStatisticModal/IssueStatisticModal';

const IssueCardsView = (props: IIssues): JSX.Element => {
  const { issues, modal } = props;

  const { list, isSynced } = issues;

  const { openModal, removeIssue, isPlayerDealer, gameState, statisticModal } =
    modal;

  const { getRadioProps } = useRadioGroup({
    name: 'issues',
    value: String(gameState?.currIssueId),
  });

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

  const renderHeading = (): JSX.Element => {
    return gameState ? (
      <></>
    ) : (
      <Heading textAlign="center" size="lg" mb="40px">
        Issues:
      </Heading>
    );
  };

  const renderRoundControlButtons = (): JSX.Element => {
    return gameState && isSynced && isPlayerDealer && gameState.currIssueId ? (
      <RoundControlButtons {...gameState} />
    ) : (
      <></>
    );
  };

  const renderIssueCard = (issue: Issue): JSX.Element => {
    const id = issue.id;

    return (
      <Stack
        opacity={issue.closed ? '0.5' : '1'}
        bg={issue.closed ? 'gray.400' : 'unset'}
        w="280px"
        key={`${id}-wrap`}
      >
        <IssueCard {...setIssueData(issue)} key={id} />
      </Stack>
    );
  };

  const renderDealerRadioCard = (issue: Issue): JSX.Element => {
    const id = issue.id;

    const radio = (getRadioProps as (obj: { value: string }) => any)({
      value: String(id),
    });

    return (
      <SessionItemRadioCard key={`${id}-radio`} {...radio}>
        {renderIssueCard(issue)}
      </SessionItemRadioCard>
    );
  };

  const renderUserHighlightedCard = (issue: Issue): JSX.Element => {
    const id = issue.id;

    if (gameState && gameState.currIssueId === id) {
      return (
        <Stack bg="teal.600" color="white" key={`${id}-checked`}>
          {renderIssueCard(issue)}
        </Stack>
      );
    } else {
      return renderIssueCard(issue);
    }
  };

  return (
    <Box mb="50px" position="relative">
      {renderHeading()}

      {renderRoundControlButtons()}

      <Stack
        w={gameState ? '280px' : '100%'}
        wrap="wrap"
        direction={gameState ? 'column' : 'row'}
        opacity={isSynced ? 1 : 0.5}
      >
        {list.map(issue => {
          return gameState && isPlayerDealer
            ? renderDealerRadioCard(issue)
            : renderUserHighlightedCard(issue);
        })}

        {isPlayerDealer && isSynced && <NewIssueButton editIssue={openModal} />}

        <IssueModal issue={modal} />

        {statisticModal && <IssueStatisticModal {...statisticModal} />}
      </Stack>

      {!isSynced && <ChakraLoader />}
    </Box>
  );
};

export default IssueCardsView;
