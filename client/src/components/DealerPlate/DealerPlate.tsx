import React from 'react';

import { Stack, Text } from '@chakra-ui/react';

import { IMemberData } from '../../../../shared/types/session/member';

import UserCard from '../../components/UserCard/UserCard';

const DealerPlate = (props: IMemberData): JSX.Element => {
  return (
    <Stack w="300px" mb="30px">
      <Text mb="-10px" padding="0 10px">
        Dealer:
      </Text>
      <UserCard {...props} />;
    </Stack>
  );
};

export default DealerPlate;
