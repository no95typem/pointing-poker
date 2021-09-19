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
  const { issue, openModal, removeIssue, isPlayerDealer } = props;

  const { id, title, priority, isSynced } = issue as Issue;

  return (
    <Stack direction="row" align="center" p="10px" boxShadow="lg">
      <Stat>
        <StatNumber isTruncated={true}>{title}</StatNumber>
        <StatHelpText mb="0">{priority}</StatHelpText>
      </Stat>

      <IconButton
        aria-label="edit"
        background="transparent"
        visibility={isPlayerDealer && isSynced ? 'visible' : 'hidden'}
        size="lg"
        icon={<ImPencil />}
        onClick={() => openModal(id)}
      />
      <IconButton
        aria-label="delete"
        background="transparent"
        visibility={isPlayerDealer && isSynced ? 'visible' : 'hidden'}
        size="lg"
        icon={<CloseIcon />}
        onClick={() => removeIssue(id)}
      />
    </Stack>
  );
};

export default IssueCard;
