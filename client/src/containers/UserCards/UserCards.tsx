import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import {
  IKickModal,
  IUserCards,
} from '../../../../shared/types/session/member';

import UserCardsView from './UserCardsView';

const UserCards = (props: IUserCards): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return <UserCardsView cardsData={props} modalData={modalData} />;
};

export default UserCards;
