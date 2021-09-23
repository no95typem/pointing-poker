import React from 'react';

import { Stack, Heading } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';
import { ICardData } from '../../../../shared/types/session/card';

import GameCard from '../GameCard/GameCard';

interface IGameCardStatistics {
  name: string;
  stat: {
    count: number;
    membersIds: number[];
  };
  quantityVoters: number;
}

const GameCardStatistics = (props: IGameCardStatistics): JSX.Element => {
  const { name, stat, quantityVoters } = props;

  const localSettings = useTypedSelector(state => state.settings);

  const { cards, scoreTypeShort } = localSettings;

  const currentCard = cards.find(card => card.value === name);

  const percent = (stat.count / quantityVoters) * 100;

  if (!currentCard) return <></>;

  const cardData: ICardData = {
    card: currentCard,
    units: scoreTypeShort,
    isGameStage: true,
  };

  return (
    <Stack direction="column" spacing="1rem">
      <GameCard {...cardData} />
      <Heading
        size="md"
        as="h4"
        w="100%"
        textAlign="center"
        fontFamily="handwrite"
      >
        {`${percent}%`}
      </Heading>
    </Stack>
  );
};

export default GameCardStatistics;
