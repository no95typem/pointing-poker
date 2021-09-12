import React from 'react';

import { Stack, IconButton, Stat, StatNumber } from '@chakra-ui/react';

import { ImPlus } from 'react-icons/im';
import { IIssueData } from '../../../../shared/types/session/issue/issue';

const NewIssueButton = (props: IIssueData): JSX.Element => {
  const { onClick } = props;

  return (
    <Stack
      onClick={() => onClick()}
      direction="row"
      align="center"
      p="10px 10px"
      boxShadow="lg"
      cursor="pointer"
    >
      <Stat>
        <StatNumber>Create new issue</StatNumber>
      </Stat>

      <IconButton
        aria-label="edit"
        background="transparent"
        size="lg"
        icon={<ImPlus />}
      />
    </Stack>
  );
};

export default NewIssueButton;
