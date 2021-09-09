import React, { useState } from 'react';

import { Stack, useDisclosure } from '@chakra-ui/react';

import UserCard from '../../../components/UserCard/UserCard';

import {
  IUserCardData,
  UserInfo,
} from '../../../../../shared/types/user/user-info';

import KickModal from '../../../components/KickModal/KickModal';

const UserCardExample = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState('');

  const [id, setId] = useState('');

  const confirmKick = () => {
    console.log(
      'server command kickID=',
      id,
      'InitiatorID=?, initiatorStatus=?',
    );

    onClose();
  };

  const kickMessage = (KickId: string, name: string): void => {
    setId(KickId);

    setName(name);

    onOpen();
  };

  const userCard1: UserInfo = {
    id: '1',
    name: 'Dan',
    surname: 'Smith',
    avatarBgColor: 'rgb(0,200,100)',
    jobPosition: 'Senior developer',
  };

  const userCardData1: IUserCardData = {
    card: userCard1,
    isKickAvailable: true,
    isItYou: true,
    kickPlayer: kickMessage,
  };

  const userCard2: UserInfo = {
    id: '2',
    name: 'Matt',
    surname: 'Rogers',
    avatarBgColor: 'rgb(200,200,100)',
    jobPosition: 'Junior developer',
  };

  const userCardData2: IUserCardData = {
    card: userCard2,
    isKickAvailable: true,
    isItYou: false,
    kickPlayer: kickMessage,
  };

  const userCardsData = [userCardData1, userCardData2];

  return (
    <Stack w="100%" wrap="wrap" direction="row">
      {userCardsData.map(userCardData => {
        const { id } = userCardData.card;

        return (
          <Stack w="300px" key={`${id}-wrap`}>
            <UserCard data={userCardData} key={id} />;
          </Stack>
        );
      })}

      <KickModal
        onClose={onClose}
        isOpen={isOpen}
        name={name}
        onConfirm={confirmKick}
        initiatorName={''}
      />
    </Stack>
  );
};

export default UserCardExample;
