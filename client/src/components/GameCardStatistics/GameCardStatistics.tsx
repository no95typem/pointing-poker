import React from 'react';

import { Stack, Heading } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';
import { ICardData } from '../../../../shared/types/session/card';

import GameCard from '../GameCard/GameCard';
import { IPercentageRec } from '../../../../shared/types/session/round/round-stat';

interface IGameCardStatistics {
  cardValue: string;
  pct: IPercentageRec;
  allPlayersCount: number;
}

const GameCardStatistics = (props: IGameCardStatistics): JSX.Element => {
  const { cardValue, pct, allPlayersCount } = props;

  const localSettings = useTypedSelector(state => state.settings);

  const { cards, scoreTypeShort } = localSettings;

  const currentCard = cards.find(card => card.value === cardValue);

  const percent = (pct.count / allPlayersCount) * 100;

  if (!currentCard) return <></>;

  const cardData: ICardData = {
    card: currentCard,
    units: scoreTypeShort,
    isGameStage: true,
    isUnitsHidden: true,
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
