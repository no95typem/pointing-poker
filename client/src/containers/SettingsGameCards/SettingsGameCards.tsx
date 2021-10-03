import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { INotification, notifSlice } from '../../redux/slices/notifications';
import { store } from '../../redux/store';
import {
  CardData,
  ICardModal,
  ICardsData,
  ICardsView,
} from '../../../../shared/types/session/card';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';

import GameCardsView from './SettingsGameCardsView';

const GameCards = (props: ICardsData): JSX.Element => {
  const { cards, units, setLocalSettings, isGameStage } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const newGameCard: CardData = {
    value: '',
    base64: '',
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
    if (!activeCard.value) {
      const notification: INotification = {
        status: 'warning',
        text: `Value can't be empty!`,
        needToShow: true,
      };

      store.dispatch(notifSlice.actions.addNotifRec(notification));

      return;
    }
    const CardWithSameValue = findEditedCard(activeCard.value);

    const cardsCopy = OBJ_PROCESSOR.deepClone(cards);

    if (CardWithSameValue) {
      const indexOfCardWithSameValue = cards.indexOf(CardWithSameValue);

      if (editedCardIndex === indexOfCardWithSameValue) {
        cardsCopy[editedCardIndex] = activeCard;

        cardsCopy.sort((s, t) => s.value.localeCompare(t.value));

        setLocalSettings('cards', cardsCopy);

        onClose();
      } else {
        const notification: INotification = {
          status: 'warning',
          text: `Value must be unique!`,
          needToShow: true,
        };

        store.dispatch(notifSlice.actions.addNotifRec(notification));

        return;
      }
    } else {
      if (editedCardIndex !== -1) {
        cardsCopy[editedCardIndex] = activeCard;
      } else {
        cardsCopy.push(activeCard);
      }

      cardsCopy.sort((s, t) => s.value.localeCompare(t.value));

      setLocalSettings('cards', cardsCopy);

      onClose();
    }
  };

  const deleteCard = (value: string): void => {
    if (cards.length <= 2) {
      const notification: INotification = {
        status: 'warning',
        text: `Can't be less than a two cards!`,
        needToShow: true,
      };

      store.dispatch(notifSlice.actions.addNotifRec(notification));

      return;
    }

    const card = findEditedCard(value);

    if (card) {
      const cardIndex = cards.indexOf(card);

      const cardsCopy = OBJ_PROCESSOR.deepClone(cards);

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

  const data: ICardsView = {
    cards,
    modal: modalData,
    units,
    deleteCard,
    isGameStage,
  };

  return <GameCardsView {...data} />;
};

export default GameCards;
