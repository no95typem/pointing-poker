import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import {
  addNotifRec,
  INotification,
  notifSlice,
} from '../../redux/slices/notifications';
import { useAppDispatch } from '../../redux/store';
import { CARDS_DECKS } from '../../presets';

import {
  CardData,
  ICardModal,
  ICardsData,
  ICardsSetModal,
} from '../../../../shared/types/session/card';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';

import { GameCardsView, IGameCardsViewProps } from './SettingsGameCardsView';

const GameCards = (props: ICardsData): JSX.Element => {
  const { cards, units, setLocalSettings, isGameStage } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const {
    isOpen: isSetModalOpen,
    onOpen: onSetModalOpen,
    onClose: onSetModalClose,
  } = useDisclosure();

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

      dispatch(addNotifRec(notification));

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

        dispatch(notifSlice.actions.addNotifRec(notification));

        return;
      }
    } else {
      if (editedCardIndex !== -1) {
        cardsCopy[editedCardIndex] = activeCard;
      } else {
        cardsCopy.push(activeCard);
      }

      // cardsCopy.sort((s, t) => s.value.localeCompare(t.value));

      setLocalSettings('cards', cardsCopy);

      onClose();
    }
  };

  const deleteCard = (value: string): void => {
    const card = findEditedCard(value);

    if (card) {
      const cardIndex = cards.indexOf(card);

      const cardsCopy = OBJ_PROCESSOR.deepClone(cards);

      cardsCopy.splice(cardIndex, 1);

      setLocalSettings('cards', cardsCopy);
    }
  };

  const handleDeckSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;

    if (key in CARDS_DECKS) {
      setLocalSettings('cards', OBJ_PROCESSOR.deepClone(CARDS_DECKS[key]));
    }
  };

  const setCardsSet = (cardsValue: string): void => {
    if (!cardsValue) {
      const notification: INotification = {
        status: 'error',
        text: `Field can't be empty!`,
        needToShow: true,
      };

      dispatch(addNotifRec(notification));

      return;
    }

    const cards: CardData[] = [];

    const values = cardsValue.split(' ');

    const isRepeats = values.some(
      value => value && values.indexOf(value) !== values.lastIndexOf(value),
    );

    if (isRepeats) {
      const notification: INotification = {
        status: 'error',
        text: `Card's values must be unique!`,
        needToShow: true,
      };

      dispatch(notifSlice.actions.addNotifRec(notification));

      return;
    }

    values.forEach(value => {
      if (value) return cards.push({ value });
    });

    if (cards.length < 2) {
      const notification: INotification = {
        status: 'warning',
        text: `Should be at least two non-empty card's values`,
        needToShow: true,
      };

      dispatch(addNotifRec(notification));

      return;
    }

    // cards.sort((s, t) => s.value.localeCompare(t.value));

    setLocalSettings('cards', cards);

    onSetModalClose();
  };

  const modalData: ICardModal = {
    onClose,
    isOpen,
    openModal,
    activeCard,
    changeCardValue,
    setCard,
  };

  const modalSetData: ICardsSetModal = {
    isSetModalOpen,
    onSetModalOpen,
    onSetModalClose,
    setCardsSet,
  };

  const data: IGameCardsViewProps = {
    cards,
    modal: modalData,
    units,
    deleteCard,
    isGameStage,
    onDeckSelect: handleDeckSelect,
    modalSetData,
  };

  return <GameCardsView {...data} />;
};

export default GameCards;
