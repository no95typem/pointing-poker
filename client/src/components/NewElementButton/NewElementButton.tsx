import React from 'react';

import { Stack, IconButton, Stat, StatNumber } from '@chakra-ui/react';

import { ImPlus } from 'react-icons/im';

interface IIssueButtonData {
  openModal: () => void;
  description: string;
}

const NewElementButton = (props: IIssueButtonData): JSX.Element => {
  const { openModal, description } = props;

  return (
    <Stack
      onClick={openModal}
      direction="row"
      align="center"
      p="10px"
      boxShadow="lg"
      cursor="pointer"
      w="280px"
      h="70px"
    >
      <Stat>
        <StatNumber fontSize="lg">{description}</StatNumber>
      </Stat>

      <IconButton
        aria-label="add"
        background="transparent"
        size="lg"
        icon={<ImPlus />}
      />
    </Stack>
  );
};

export default NewElementButton;
