import { Box, Stack, UseRadioGroupReturn } from '@chakra-ui/react';
import Slider from 'react-slick';

import {
  ICardData,
  ICardsGameData,
} from '../../../../../shared/types/session/card';
import { gameCardsSettings } from '../../../helpers/swiperSettings';

import GameCard from '../../GameCard/GameCard';
import SessionItemRadioCard from '../../SessionItemRadioCard/SessionItemRadioCard';

interface IChoosingCards {
  cardsData: ICardsGameData;
  radioProps: UseRadioGroupReturn;
}

const ChoosingCards = (props: IChoosingCards): JSX.Element => {
  const { cardsData, radioProps } = props;

  const { cards, units } = cardsData;

  const { getRadioProps } = radioProps;

  return (
    <Box w="90%" m="0 auto">
      <Slider {...gameCardsSettings}>
        {cards.map(card => {
          const id = card.value;

          const data: ICardData = {
            card,
            units,
            isControlShown: false,
          };

          const radio = (getRadioProps as (obj: { value: string }) => any)({
            value: String(card.value),
          });

          return (
            <SessionItemRadioCard key={`${id}-radio`} {...radio}>
              <Stack m="5px" justify="center" align="center">
                <GameCard {...data} />;
              </Stack>
            </SessionItemRadioCard>
          );
        })}
      </Slider>
    </Box>
  );
};

export default ChoosingCards;
