import React from 'react';

import { Box, Button, Select, Stack } from '@chakra-ui/react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

import { ICardData, ICardsView } from '../../../../shared/types/session/card';
import { gameCardsSettings } from '../../helpers/swiperSettings';

import GameCard from '../../components/GameCard/GameCard';
import GameCardModal from '../../components/GameCardModal/GameCardModal';

const GameCardsView = (props: ICardsView): JSX.Element => {
  const { cards, modal, units, deleteCard, isGameStage } = props;

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
        <Select placeholder="Choose a card's set" maxW="300px">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
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

export default GameCardsView;
