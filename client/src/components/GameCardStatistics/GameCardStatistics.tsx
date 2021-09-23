import React from 'react';

import { Stack, Text } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';
import GameCard from '../GameCard/GameCard';
import { ICardData } from '../../../../shared/types/session/card';

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

  const data: ICardData = {
    card: currentCard,
    units: scoreTypeShort,
  };

  return (
    <Stack direction="column" spacing="1rem">
      <GameCard {...data} />
      <Text>{`${percent}%`}</Text>
    </Stack>
  );
};

export default GameCardStatistics;
