import React from 'react';

import { Stack } from '@chakra-ui/react';

import UserCard from '../../../components/UserCard/UserCard';
import { UserInfo } from '../../../../../shared/types/user/user-info';

const UserCardExample = (): JSX.Element => {
  const userCard: UserInfo = {
    name: 'Dan',
    surname: 'Smith',
    avatarBg: 'rgb(0,200,100)',
    position: 'Senior developer',
  };

  return (
    <Stack w="18%">
      <UserCard card={userCard} />;
    </Stack>
  );
};

export default UserCardExample;
