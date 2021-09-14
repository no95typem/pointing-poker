import React from 'react';

import { Stack, Text } from '@chakra-ui/react';

import { IMemberDataBundle } from '../../../../shared/types/session/member';

import UserCard from '../../components/UserCard/UserCard';

const DealerPlate = (props: IMemberDataBundle): JSX.Element => {
  const { data } = props;

  return (
    <Stack w="300px" mb="30px">
      <Text mb="-10px" padding="0 10px">
        Dealer:
      </Text>
      <UserCard data={data} />;
    </Stack>
  );
};

export default DealerPlate;
