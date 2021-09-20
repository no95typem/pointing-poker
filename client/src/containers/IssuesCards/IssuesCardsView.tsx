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
import RadioCard from '../../components/RadioCard/RadioCard';

const IssueCardsView = (props: IIssues): JSX.Element => {
  const { issues, modal } = props;

  const { list, isSynced } = issues;

  const { openModal, removeIssue, isPlayerDealer, isGameStage } = modal;

  // const { getRootProps, getRadioProps }

  const { getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: issues.list[0] ? String(issues.list[0].id) : '',
    onChange: console.log,
  });

  // const group = getRootProps();

  const setIssueData = (issue: Issue): IIssueData => {
    return {
      isPlayerDealer,
      openModal,
      removeIssue,
      issue,
    };
  };

  return (
    <Box mb="50px" position="relative">
      {!isGameStage && (
        <Heading textAlign="center" size="lg" mb="40px">
          Issues:
        </Heading>
      )}

      <Stack
        w={isGameStage ? '300px' : '100%'}
        wrap="wrap"
        direction={isGameStage ? 'column' : 'row'}
        opacity={isSynced ? 1 : 0.5}
      >
        {list.map(issue => {
          const id = issue.id;

          const issueCard = (
            <Stack w="300px" key={`${id}-wrap`}>
              <IssueCard {...setIssueData(issue)} key={id} />
            </Stack>
          );

          if (isGameStage && isPlayerDealer) {
            const radio = (getRadioProps as (obj: { value: string }) => any)({
              value: String(issue.id),
            });

            return (
              <RadioCard key={`${id}-radio`} {...radio}>
                {issueCard}
              </RadioCard>
            );
          } else {
            if (isGameStage && list[0] === issue) {
              return (
                <Stack bg="teal.600" color="white" key={`${id}-checked`}>
                  {issueCard}
                </Stack>
              );
            } else {
              return issueCard;
            }
          }
        })}

        {isPlayerDealer && isSynced && <NewIssueButton editIssue={openModal} />}

        <IssueModal issue={modal} />
      </Stack>

      {!isSynced && <ChakraLoader />}
    </Box>
  );
};

export default IssueCardsView;
