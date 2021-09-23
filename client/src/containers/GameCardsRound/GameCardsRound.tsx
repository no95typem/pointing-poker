import React, { useState } from 'react';
import { Box, Heading, Stack, useRadioGroup } from '@chakra-ui/react';

import { LOCALE_US } from '../../locales/locale-us';

import {
  CardData,
  ICardData,
  ICardsGame,
} from '../../../../shared/types/session/card';
import { CSMsgPick } from '../../../../shared/types/cs-msgs/msgs/player/cs-msg-pick';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import GameCard from '../../components/GameCard/GameCard';

import SessionItemRadioCard from '../../components/SessionItemRadioCard/SessionItemRadioCard';

const GameCardsRound = (props: ICardsGame): JSX.Element => {
  const { cards, isGameStage, units } = props;

  const [selectedRadioValue, setSelectedRadioValue] = useState('');

  const changeIssue = (value: string) => {
    setSelectedRadioValue(value);

    const msg = new CSMsgPick(value);

    SERVER_ADAPTER.send(msg);
  };

  const { getRadioProps } = useRadioGroup({
    name: 'issues',
    value: selectedRadioValue,
    onChange: changeIssue,
  });

  const setCardData = (card: CardData): ICardData => {
    return {
      card,
      isGameStage,
      units,
    };
  };

  return (
    <Box w="100%" mb="30px">
      {!isGameStage && (
        <Heading mb="20px" size="md">
          {LOCALE_US.SETTINGS_CARDS_HEADER}
        </Heading>
      )}

      <Stack
        w="100%"
        wrap="wrap"
        direction="row"
        justify="center"
        alignItems="center"
      >
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
            <SessionItemRadioCard key={`${id}-radio`} {...radio}>
              {card}
            </SessionItemRadioCard>
          );
        })}
      </Stack>
    </Box>
  );
};

export default GameCardsRound;
