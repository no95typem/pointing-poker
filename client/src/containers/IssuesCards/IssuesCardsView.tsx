import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import { IIssues } from '../../../../shared/types/session/issue/issue';

import IssueCard from '../../components/IssueCard/IssueCard';
import IssueModal from '../../components/IssueModal/IssueModal';
import NewIssueButton from '../../components/NewIssueButton/NewIssueButton';

const IssueCardsView = (props: IIssues): JSX.Element => {
  const { issues, modal } = props;

  return (
    <Box mb="50px">
      <Heading textAlign="center" size="lg" mb="40px">
        Issues:
      </Heading>
      <Stack w="100%" wrap="wrap" direction="row">
        {issues.map(issue => {
          const id = issue.id;

          return (
            <Stack w="300px" key={`${id}-wrap`}>
              <IssueCard onClick={modal.onClick} issue={issue} key={id} />;
            </Stack>
          );
        })}

        <NewIssueButton onClick={modal.onClick} />

        <IssueModal issue={modal} />
      </Stack>
    </Box>
  );
};

export default IssueCardsView;
