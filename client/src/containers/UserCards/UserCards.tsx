import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { UserInfo } from '../../../../shared/types/user/user-info';
import { ConnectionData } from '../../../../shared/types/session/connection-data';
import { Member, IMemberData } from '../../../../shared/types/session/member';

import { IKickModal } from '../../components/KickModal/KickModal';

import UserCardsView from './UserCardsView';

const UserCards = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //! временные хуки, для визуализации. В будущем будет реализовано через стор.

  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(0);

  //!

  const confirmKick = () => {
    console.log('server command kickID=', id);

    setIsLoading(true);

    setTimeout(() => {
      onClose();

      setIsLoading(false);
    }, 1500);
  };

  const kickMessage = (KickId: number, name: string): void => {
    setId(KickId);

    setName(name);

    onOpen();
  };

  const isItYou = (member: Member): boolean => {
    return playerData.userSessionPublicId === member.userSessionPublicId;
  };

  const playerData: ConnectionData = {
    role: 'DEALER',
    userSessionPrivateId: '1',
    userSessionPublicId: 1,
  };

  const userCard1: UserInfo = {
    name: 'Dan',
    surname: 'Smith',
    avatarBgColor: 'rgb(0,200,100)',
    jobPosition: 'Senior developer',
  };

  const member1: Member = {
    userInfo: userCard1,
    userSessionPublicId: 1,
    userRole: 'DEALER',
    userState: 'CONNECTED',
    isSynced: true,
  };

  const memberdData1: IMemberData = {
    member: member1,
    isRoundStarted: false,
    isItYou: isItYou(member1),
    kickPlayer: kickMessage,
  };

  const userCard2: UserInfo = {
    name: 'Matt',
    surname: 'Rogers',
    avatarBgColor: 'rgb(200,200,100)',
    jobPosition: 'Junior developer',
  };

  const member2: Member = {
    userInfo: userCard2,
    userSessionPublicId: 2,
    userRole: 'PLAYER',
    userState: 'CONNECTED',
    isSynced: true,
  };

  const memberdData2: IMemberData = {
    member: member2,
    isRoundStarted: false,
    isItYou: isItYou(member2),
    kickPlayer: kickMessage,
  };

  const membersData = [memberdData1, memberdData2];

  const modalData: IKickModal = {
    onClose: onClose,
    isOpen: isOpen,
    name: name,
    onConfirm: confirmKick,
    initiatorName: '',
    isLoading: isLoading,
  };

  return <UserCardsView membersData={membersData} modalData={modalData} />;
};

export default UserCards;
