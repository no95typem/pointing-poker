import React, { useState } from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';

import {
  CardData,
  ICardModal,
  ICardsData,
  ICardsView,
} from '../../../../shared/types/session/card';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';

import GameCardsView from './GameCardsView';

const GameCards = (props: ICardsData): JSX.Element => {
  const toast = useToast();

  const { cards, units, setLocalSettings } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const newGameCard: CardData = {
    value: '',
  };

  const [editedCardIndex, setEditedCardIndex] = useState(-1);

  const [activeCard, setActiveCard] = useState<CardData>(newGameCard);

  const findEditedCard = (cardValue = ''): CardData | undefined => {
    return cards.find(card => card.value === cardValue);
  };

  const openModal = (cardValue = ''): void => {
    const editedCard = findEditedCard(cardValue);

    if (editedCard) {
      setActiveCard(editedCard);

      setEditedCardIndex(cards.indexOf(editedCard));
    } else {
      setActiveCard(newGameCard);

      setEditedCardIndex(-1);
    }

    onOpen();
  };

  const changeCardValue = (card: CardData): void => {
    setActiveCard({ ...card });
  };

  const setCard = (): void => {
    const CardWithSameValue = findEditedCard(activeCard.value);

    const cardsCopy = OBJ_PROCESSOR.deepClone(cards);

    if (CardWithSameValue) {
      const indexOfCardWithSameValue = cards.indexOf(CardWithSameValue);

      if (editedCardIndex === indexOfCardWithSameValue) {
        cardsCopy[editedCardIndex] = activeCard;

        cardsCopy.sort((s, t) => s.value.localeCompare(t.value));

        console.log(cardsCopy);

        setLocalSettings('cards', cardsCopy);

        onClose();
      } else {
        toast({
          title: 'Value must be unique!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      if (editedCardIndex !== -1) {
        cardsCopy[editedCardIndex] = activeCard;
      } else {
        cardsCopy.push(activeCard);
      }

      cardsCopy.sort((s, t) => s.value.localeCompare(t.value));

      console.log(cardsCopy);

      setLocalSettings('cards', cardsCopy);

      onClose();
    }
  };

  const deleteCard = (value: string): void => {
    const card = findEditedCard(value);

    console.log(card);

    if (card) {
      const cardIndex = cards.indexOf(card);

      const cardsCopy = OBJ_PROCESSOR.deepClone(cards);

      console.log(cardIndex);

      cardsCopy.splice(cardIndex, 1);

      setLocalSettings('cards', cardsCopy);
    }
  };

  const modalData: ICardModal = {
    onClose: onClose,
    isOpen: isOpen,
    openModal: openModal,
    activeCard: activeCard,
    changeCardValue: changeCardValue,
    setCard: setCard,
  };

  const data: ICardsView = { cards, modal: modalData, units, deleteCard };

  return <GameCardsView {...data} />;
};

export default GameCards;
