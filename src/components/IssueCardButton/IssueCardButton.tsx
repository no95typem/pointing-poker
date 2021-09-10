import React from 'react';

import { Stack, IconButton, Stat, StatNumber } from '@chakra-ui/react';

import { ImPlus } from 'react-icons/im';
import { IIssueData } from '../../../../shared/types/session/issue/issue';

const IssueCardButton = (props: IIssueData): JSX.Element => {
  const { onClick } = props;

  return (
    <Stack direction="row" align="center" p="10px 10px" boxShadow="lg">
      <Stat>
        <StatNumber>Create new issue</StatNumber>
      </Stat>

      <IconButton
        aria-label="edit"
        background="transparent"
        visibility={true ? 'visible' : 'hidden'}
        size="lg"
        icon={<ImPlus />}
        onClick={() => onClick()}
      />
    </Stack>
  );
};

export default IssueCardButton;
