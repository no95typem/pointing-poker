import { Box, Button, Select, Stack } from '@chakra-ui/react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

import {
  CardData,
  ICardData,
  ICardModal,
  ISharedCardData,
} from '../../../../shared/types/session/card';
import { gameCardsSettings } from '../../helpers/swiperSettings';

import GameCard from '../../components/GameCard/GameCard';
import GameCardModal from '../../components/GameCardModal/GameCardModal';
import { CARDS_DECKS } from '../../presets';

export interface IGameCardsViewProps extends ISharedCardData {
  cards: CardData[];
  modal: ICardModal;
  deleteCard: (value: string) => void;
  isGameStage?: boolean;
  onDeckSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const GameCardsView = (props: IGameCardsViewProps): JSX.Element => {
  const { cards, modal, units, deleteCard, isGameStage, onDeckSelect } = props;

  return (
    <Box maxW="100%">
      <Stack
        direction={['column', 'column', 'row']}
        spacing="4"
        w={['100%', '100%', '100%', '80%']}
        justify="space-around"
        mb="10px"
        wrap="wrap"
      >
        <Select placeholder="Choose a deck" w="200px" onChange={onDeckSelect}>
          {Object.keys(CARDS_DECKS).map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
        <Button
          w="130px"
          variant="solid"
          style={{ marginInlineStart: '0' }}
          onClick={() => modal.openModal()}
        >
          Add card
        </Button>
      </Stack>
      <Box maxW="100vw" m="0 auto" p="0 20px">
        <Slider {...gameCardsSettings}>
          {cards.map(card => {
            const id = card.value;

            const data: ICardData = {
              card,
              edit: modal.openModal,
              units,
              deleteCard,
              isControlShown: !isGameStage,
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

      <GameCardModal modal={modal} />
    </Box>
  );
};
