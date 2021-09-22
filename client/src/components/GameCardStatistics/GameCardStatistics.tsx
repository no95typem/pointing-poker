import React from 'react';

import { Stack, Text } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';
import { ICardData } from '../../../../shared/types/session/card';

import GameCard from '../GameCard/GameCard';

interface Props {
  name: string;
  stat: {
    count: number;
    membersIds: number[];
  };
  quantityVoters: number;
}

const GameCardStatistics = (data: Props): JSX.Element => {
  const { name, stat, quantityVoters } = data;

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
    <Stack>
      <GameCard {...cardData} />
      <Text textAlign="center">{`${percent}%`}</Text>
    </Stack>
  );
};

export default GameCardStatistics;
