import { useState } from 'react';
import { Box, Heading, Stack, useRadioGroup } from '@chakra-ui/react';
import Slider from 'react-slick';

import { LOCALE_US } from '../../locales/locale-us';

import {
  CardData,
  ICardData,
  ICardsGame,
} from '../../../../shared/types/session/card';
import { gameCardsSettings } from '../../helpers/swiperSettings';

import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import GameCard from '../../components/GameCard/GameCard';
import SessionItemRadioCard from '../../components/SessionItemRadioCard/SessionItemRadioCard';

const GameCardsRound = (props: ICardsGame): JSX.Element => {
  const { cards, isGameStage, units } = props;

  const [selectedRadioValue, setSelectedRadioValue] = useState('');

  const changeIssue = (value: string) => {
    setSelectedRadioValue(value);

    SERVER_ADAPTER.pickCard(value);
  };

  const { getRadioProps } = useRadioGroup({
    name: 'issues',
    value: selectedRadioValue,
    onChange: changeIssue,
  });

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

export default GameCardsRound;
