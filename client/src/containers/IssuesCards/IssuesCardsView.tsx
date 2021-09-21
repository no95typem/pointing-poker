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
import RoundControlButtons from '../RoundControlButtons/RoundControlButtons';

const IssueCardsView = (props: IIssues): JSX.Element => {
  const { issues, modal } = props;

  const { list, isSynced } = issues;

  const { openModal, removeIssue, isPlayerDealer, gameState } = modal;

  // const { getRootProps, getRadioProps }

  // const { getRadioProps, setValue } = useRadioGroup({
  //   name: 'issues',
  //   value: String(gameState?.currIssueId),
  //   onChange: changeIssue,
  // });

  // const changeIssue = (value: string): void => {
  //   setValue(value);
  // };

  const { getRadioProps } = useRadioGroup({
    name: 'issues',
    value: String(gameState?.currIssueId),
  });

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
      {!gameState && (
        <Heading textAlign="center" size="lg" mb="40px">
          Issues:
        </Heading>
      )}

      {gameState && isPlayerDealer && gameState.currIssueId && (
        <RoundControlButtons {...gameState} />
      )}

      <Stack
        w={gameState ? '300px' : '100%'}
        wrap="wrap"
        direction={gameState ? 'column' : 'row'}
        opacity={isSynced ? 1 : 0.5}
      >
        {list.map(issue => {
          const id = issue.id;

          const issueCard = (
            <Stack w="280px" key={`${id}-wrap`}>
              <IssueCard {...setIssueData(issue)} key={id} />
            </Stack>
          );

          if (gameState && isPlayerDealer) {
            const radio = (getRadioProps as (obj: { value: string }) => any)({
              value: String(issue.id),
            });

            return (
              <RadioCard key={`${id}-radio`} {...radio}>
                {issueCard}
              </RadioCard>
            );
          } else {
            console.log(gameState?.currIssueId);

            if (gameState && gameState.currIssueId === issue.id) {
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
