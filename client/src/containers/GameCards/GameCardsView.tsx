import React from 'react';

import { Box, Button, Select, Stack } from '@chakra-ui/react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

import { ICardData, ICardsView } from '../../../../shared/types/session/card';

import GameCard from '../../components/GameCard/GameCard';
import GameCardModal from '../../components/GameCardModal/GameCardModal';
import SliderCustomArrow from '../SliderCustomArrow/SliderCustomArrow';

const GameCardsView = (props: ICardsView): JSX.Element => {
  const { cards, modal, units, deleteCard } = props;

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SliderCustomArrow />,
    prevArrow: <SliderCustomArrow />,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

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
          colorScheme="facebook"
          w="130px"
          variant="solid"
          style={{ marginInlineStart: '0' }}
          onClick={() => modal.openModal()}
        >
          Add card
        </Button>
      </Stack>
      <Box maxW="100vw" m="0 auto" p="0 20px">
        <Slider {...settings}>
          {cards.map(card => {
            const id = card.value;

            const data: ICardData = {
              card,
              edit: modal.openModal,
              units,
              deleteCard,
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
