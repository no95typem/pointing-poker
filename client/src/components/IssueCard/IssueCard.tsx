import React from 'react';

import {
  Stack,
  IconButton,
  Stat,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { CloseIcon } from '@chakra-ui/icons';

import {
  IIssueData,
  Issue,
} from '../../../../shared/types/session/issue/issue';

const IssueCard = (props: IIssueData): JSX.Element => {
  const { issue, openModal, removeIssue, isPlayerDealer, openStatisticModal } =
    props;

  const { id, title, priority, isSynced, closed } = issue as Issue;

  const showIssueStatistic = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!openStatisticModal) return;

    const isButton = e.nativeEvent
      .composedPath()
      .some(el => el instanceof HTMLButtonElement);

    if (!isButton) {
      console.log('hello world', id);
      openStatisticModal(id);
    }
  };

  return (
    <Stack
      direction="row"
      align="center"
      p="10px"
      h="70px"
      boxShadow="lg"
      cursor={openStatisticModal ? 'pointer' : 'unset'}
      onClick={showIssueStatistic}
    >
      <Stat>
        <StatNumber fontSize="lg" isTruncated={true}>
          {title}
        </StatNumber>
        <StatHelpText fontSize="xs" mb="0">
          {priority}
        </StatHelpText>
      </Stat>

      <IconButton
        aria-label="edit"
        background="transparent"
        visibility={
          isPlayerDealer && isSynced && !closed ? 'visible' : 'hidden'
        }
        size="lg"
        icon={<ImPencil />}
        onClick={() => openModal(id)}
      />
      <IconButton
        aria-label="delete"
        background="transparent"
        visibility={
          isPlayerDealer && isSynced && !closed ? 'visible' : 'hidden'
        }
        size="lg"
        icon={<CloseIcon />}
        onClick={() => removeIssue(id)}
      />
    </Stack>
  );
};

export default IssueCard;
