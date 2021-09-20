import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import {
  IIssueData,
  IIssues,
  Issue,
} from '../../../../shared/types/session/issue/issue';

import IssueCard from '../../components/IssueCard/IssueCard';
import IssueModal from '../../components/IssueModal/IssueModal';
import NewIssueButton from '../../components/NewIssueButton/NewIssueButton';
import ChakraLoader from '../../components/Loader/ChakraLoader';

const IssueCardsView = (props: IIssues): JSX.Element => {
  const { issues, modal } = props;

  const { list, isSynced } = issues;

  const { openModal, removeIssue, isPlayerDealer } = modal;

  const setIssueData = (issue: Issue): IIssueData => {
    return {
      isPlayerDealer: isPlayerDealer,
      openModal: openModal,
      removeIssue: removeIssue,
      issue: issue,
    };
  };

  return (
    <Box mb="50px" position="relative">
      <Heading textAlign="center" size="lg" mb="40px">
        Issues:
      </Heading>
      <Stack w="100%" wrap="wrap" direction="row" opacity={isSynced ? 1 : 0.5}>
        {list.map(issue => {
          const id = issue.id;

          return (
            <Stack w="280px" key={`${id}-wrap`}>
              <IssueCard {...setIssueData(issue)} key={id} />
            </Stack>
          );
        })}

        {isPlayerDealer && isSynced && <NewIssueButton editIssue={openModal} />}

        <IssueModal issue={modal} />
      </Stack>
      {!isSynced && <ChakraLoader />}
    </Box>
  );
};

export default IssueCardsView;
