import React from 'react';

import { Stack, IconButton, Stat, StatNumber } from '@chakra-ui/react';

import { ImPlus } from 'react-icons/im';

interface IIssueButtonData {
  editIssue: () => void;
}

const NewIssueButton = (props: IIssueButtonData): JSX.Element => {
  const { editIssue } = props;

  return (
    <Stack
      onClick={editIssue}
      direction="row"
      align="center"
      p="10px"
      boxShadow="lg"
      cursor="pointer"
      w="300px"
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
