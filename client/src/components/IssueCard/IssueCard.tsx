import React from 'react';

import {
  Stack,
  IconButton,
  Stat,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import {
  IIssueData,
  Issue,
} from '../../../../shared/types/session/issue/issue';

const IssueCard = (props: IIssueData): JSX.Element => {
  const { issue, onClick } = props;

  const { id, title, priority } = issue as Issue;

  return (
    <Stack direction="row" align="center" p="10px" boxShadow="lg">
      <Stat>
        <StatNumber>{title}</StatNumber>
        <StatHelpText mb="0">{priority}</StatHelpText>
      </Stat>

      <IconButton
        aria-label="edit"
        background="transparent"
        visibility={true ? 'visible' : 'hidden'}
        size="lg"
        icon={<ImPencil />}
        onClick={() => onClick(id)}
      />
    </Stack>
  );
};

export default IssueCard;
