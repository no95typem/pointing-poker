import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import {
  IKickModal,
  IUserCards,
} from '../../../../shared/types/session/member';

import UserCardsView from './UserCardsView';

const UserCards = (props: IUserCards): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { members, findWhoIsUser, isRoundStarted } = props;

  const [kickedName, setKickedName] = useState('');

  const [kickedId, setKickedId] = useState(0);

  const confirmKick = () => {
    onClose();
    console.log('server command --kick', kickedId);
  };

  const setModalWindowInfo = (id: number, name: string) => {
    setKickedId(id);

    setKickedName(name);

    onOpen();
  };

  const modalData: IKickModal = {
    onClose: onClose,
    isOpen: isOpen,
    name: kickedName,
    onConfirm: confirmKick,
    initiatorName: '',
    kickPlayer: setModalWindowInfo,
  };

  const userCardsData: IUserCards = {
    members: members,
    findWhoIsUser: findWhoIsUser,
    isRoundStarted: isRoundStarted,
  };

  return <UserCardsView cardsData={userCardsData} modalData={modalData} />;
};

export default UserCards;
