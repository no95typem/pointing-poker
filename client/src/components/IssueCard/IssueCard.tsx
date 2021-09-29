import React from 'react';

import {
  Stack,
  IconButton,
  Stat,
  StatNumber,
  StatHelpText,
  Text,
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

  const { id, title, priority, isSynced, closed, value } = issue as Issue;

  const isEditable = isPlayerDealer && isSynced && !closed;

  const showIssueStatistic = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!openStatisticModal) return;

    const isButton = e.nativeEvent
      .composedPath()
      .some(el => el instanceof HTMLButtonElement);

    if (!isButton) {
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
      <Stack w="100%" direction="row" justify="space-between" align="center">
        <Stat>
          <StatNumber fontSize="lg" isTruncated={true}>
            {title}
          </StatNumber>
          <StatHelpText fontSize="xs" mb="0">
            {priority}
          </StatHelpText>
        </Stat>
        {closed && value && (
          <Text
            maxW="100px"
            isTruncated
            fontSize="xl"
            fontFamily="fantasy"
            p="0 5px"
          >
            {value}
          </Text>
        )}
      </Stack>

      {isEditable && (
        <IconButton
          aria-label="edit"
          background="transparent"
          size="lg"
          icon={<ImPencil />}
          onClick={() => openModal(id)}
        />
      )}
      {isEditable && (
        <IconButton
          aria-label="delete"
          background="transparent"
          size="lg"
          icon={<CloseIcon />}
          onClick={() => removeIssue(id)}
        />
      )}
    </Stack>
  );
};

export default IssueCard;
