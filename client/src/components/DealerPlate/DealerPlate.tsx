import React from 'react';

import { Stack, Text } from '@chakra-ui/react';

import { IMemberData } from '../../../../shared/types/session/member';

import UserCard from '../../components/UserCard/UserCard';
import { QuestionIcon } from '@chakra-ui/icons';

export interface IDealerPlateProps {
  dealerMemberData?: IMemberData;
}

const DealerPlate = (props: IDealerPlateProps): JSX.Element => {
  return (
    <Stack w="300px" mb="30px">
      <Text mb="-10px" padding="0 10px">
        Dealer:
      </Text>
      {props.dealerMemberData ? (
        <UserCard {...props.dealerMemberData} />
      ) : (
        <QuestionIcon />
      )}
    </Stack>
  );
};

export default DealerPlate;
