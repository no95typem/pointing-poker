import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { CardData, ICardModal } from '../../../../shared/types/session/card';

import GameCardsView from './GameCardsView';

const GameCards = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const card1: CardData = {
    value: '1',
    base64: 'sp',
  };

  const card2: CardData = {
    value: '2',
    base64: 'sp',
  };

  const [editCard, setEditCard] = useState<CardData>();

  const cards = [card1, card2];

  const openModal = (cardValue?: string): void => {
    setEditCard(cards.find(card => card.value === cardValue));

    onOpen();
  };

  const modalData: ICardModal = {
    onClose: onClose,
    isOpen: isOpen,
    onClick: openModal,
    editCard: editCard,
  };

  return <GameCardsView cards={cards} modal={modalData} />;
};

export default GameCards;
