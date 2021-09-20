import React from 'react';

import { Stack, Text } from '@chakra-ui/react';

import { QuestionIcon } from '@chakra-ui/icons';

interface IVote {
  value?: string;
}

const UserVote = (props: IVote): JSX.Element => {
  const { value } = props;

  return (
    <Stack
      w="100px"
      h="70px"
      justify="center"
      align="center"
      p="10px 10px"
      boxShadow="lg"
    >
      {value ? (
        <Text>{value}</Text>
      ) : (
        <QuestionIcon color="facebook.300" w={6} h={6} />
      )}
    </Stack>
  );
};

export default UserVote;
