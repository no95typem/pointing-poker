import React, { useState } from 'react';
import { Box, Button, Heading, Stack, useRadioGroup } from '@chakra-ui/react';
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
  const { cards, isGameStage, units, isPlayerDealer, isResultsVisible } = props;

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

  const setCardData = (card: CardData): ICardData => {
    return {
      card,
      units,
    };
  };

  return (
    <Box w="66%" maxW="100%" mb="30px">
      {!isGameStage && (
        <Heading mb="20px" size="md">
          {LOCALE_US.SETTINGS_CARDS_HEADER}
        </Heading>
      )}
      {isGameStage && isPlayerDealer && (
        <Stack w="100%" mb="30px" align="center" justify="center" p="5px 20px">
          <Button onClick={SERVER_ADAPTER.toggleResultsVisibility}>
            {isResultsVisible ? 'Hide results' : 'Show results'}
          </Button>
        </Stack>
      )}
      <Box Box maxW="100vw" m="0 auto" p="0 20px">
        <Slider {...gameCardsSettings}>
          {cards.map(cardData => {
            const id = cardData.value;

            const card = (
              <Stack key={`${id}-wrap`}>
                <GameCard {...setCardData(cardData)} key={id} />;
              </Stack>
            );

            const radio = (getRadioProps as (obj: { value: string }) => any)({
              value: String(cardData.value),
            });

            return (
              <Box key={`${id}-box`}>
                <SessionItemRadioCard key={`${id}-radio`} {...radio}>
                  {card}
                </SessionItemRadioCard>
              </Box>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
};

export default GameCardsRound;
