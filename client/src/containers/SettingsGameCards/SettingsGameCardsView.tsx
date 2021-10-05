import { Box, Button, Flex, Select, Stack } from '@chakra-ui/react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

import { CARDS_DECKS } from '../../presets';
import {
  CardData,
  ICardData,
  ICardModal,
  ICardsSetModal,
  ISharedCardData,
} from '../../../../shared/types/session/card';
import { gameCardsSettings } from '../../helpers/swiperSettings';

import GameCard from '../../components/GameCard/GameCard';
import GameCardModal from '../../components/GameCardModal/GameCardModal';
import GameCardsSetModal from '../../components/GameCardsSetModal/GameCardsSetModal';
import { useState } from 'react';

export interface IGameCardsViewProps extends ISharedCardData {
  cards: CardData[];
  modal: ICardModal;
  modalSetData: ICardsSetModal;
  deleteCard: (value: string) => void;
  isGameStage?: boolean;
  onDeckSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const getText = (key: string): string => {
  const text = key.toLowerCase().split('');

  text[0] = text[0].toUpperCase();

  return text.join('').split('_').join(' ');
};

export const GameCardsView = (props: IGameCardsViewProps): JSX.Element => {
  const { cards, modal, units, deleteCard, onDeckSelect, modalSetData } = props;

  const [value, setValue] = useState('');

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const select = e.target;

    setValue(select.value);

    onDeckSelect(e);
  };

  const showPlaceholder = (): void => {
    setValue('');
  };

  return (
    <>
      <Flex
        direction="column"
        gridGap={4}
        h="100%"
        w="100%"
        justify="space-between"
        align="flex-end"
      >
        <Flex
          maxW="100%"
          wrap="wrap"
          align="center"
          justify="center"
          gridGap={2}
        >
          <Select
            value={value}
            placeholder="Choose a deck"
            w="200px"
            onChange={changeValue}
          >
            {Object.keys(CARDS_DECKS).map(key => (
              <option key={key} value={key}>
                {getText(key)}
              </option>
            ))}
          </Select>
          <Button
            border="1px solid black"
            w="130px"
            variant="solid"
            style={{ marginInlineStart: '0' }}
            onClick={() => modalSetData.onSetModalOpen()}
          >
            Add Cards Set
          </Button>
          <Button
            border="1px solid black"
            w="130px"
            variant="solid"
            style={{ marginInlineStart: '0' }}
            onClick={() => modal.openModal()}
          >
            Add card
          </Button>
        </Flex>
        <Box w="90%" m="0 auto">
          <Slider {...gameCardsSettings}>
            {cards.map(card => {
              const id = card.value;

              const data: ICardData = {
                card,
                edit: modal.openModal,
                units,
                deleteCard,
                isControlShown: true,
              };

              return (
                <Box key={`${id}-box`}>
                  <Stack
                    key={`${id}-wrap`}
                    m="5px"
                    justify="center"
                    align="center"
                  >
                    <GameCard {...data} key={id} />;
                  </Stack>
                </Box>
              );
            })}
          </Slider>
        </Box>
        <Box></Box>
      </Flex>

      <GameCardModal modal={modal} />
      <GameCardsSetModal {...{ modal: modalSetData, showPlaceholder }} />
    </>
  );
};
