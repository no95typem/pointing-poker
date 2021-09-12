import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { member1, member2, playerData } from './userCardsTemplateData';
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

  const memberdData1: IMemberData = {
    member: member1,
    isRoundStarted: false,
    isItYou: isItYou(member1),
    kickPlayer: kickMessage,
  };

  const memberdData2: IMemberData = {
    ...memberdData1,
    member: member2,
    isItYou: isItYou(member2),
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
