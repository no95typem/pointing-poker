import React from 'react';

import { Stack, Icon } from '@chakra-ui/react';

import { ImPlus } from 'react-icons/im';

interface IGameCardCreate {
  onClick: () => void;
}

const NewGameCardButton = (props: IGameCardCreate): JSX.Element => {
  const { onClick } = props;

  return (
    <Stack
      w="150px"
      height="210px"
      onClick={() => onClick()}
      align="center"
      justifyContent="center"
      p="10px"
      boxShadow="lg"
      cursor="pointer"
      _hover={{ bg: 'green.300' }}
    >
      <Icon as={ImPlus} w={8} h={8} />
    </Stack>
  );
};

export default NewGameCardButton;
