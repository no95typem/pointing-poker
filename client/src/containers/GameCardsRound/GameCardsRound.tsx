import React, { useState } from 'react';

import { Box, Heading, Stack, useRadioGroup } from '@chakra-ui/react';

import {
  CardData,
  ICardData,
  ICardsGame,
} from '../../../../shared/types/session/card';

import GameCard from '../../components/GameCard/GameCard';

import { LOCALE_US } from '../../locales/locale-us';
import RadioCard from '../../components/RadioCard/RadioCard';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';
import { CSMsgPick } from '../../../../shared/types/cs-msgs/msgs/player/cs-msg-pick';

const GameCardsRound = (props: ICardsGame): JSX.Element => {
  const { cards, isGameStage, units } = props;

  const [value, setValue] = useState('');

  const changeIssue = (value: string) => {
    setValue(value);
    const msg = new CSMsgPick(value);
    SERVER_ADAPTER.send(msg);
  };

  const { getRadioProps } = useRadioGroup({
    name: 'issues',
    value: value,
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
    <Box mb="30px">
      {!isGameStage && (
        <Heading mb="20px" size="md">
          {LOCALE_US.SETTINGS_CARDS_HEADER}
        </Heading>
      )}

      <Stack w="100%" wrap="wrap" direction="row">
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
            <RadioCard key={`${id}-radio`} {...radio}>
              {card}
            </RadioCard>
          );
        })}
      </Stack>
    </Box>
  );
};

export default GameCardsRound;
