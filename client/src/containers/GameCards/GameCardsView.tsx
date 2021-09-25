import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

import { ICardData, ICardsView } from '../../../../shared/types/session/card';

import GameCard from '../../components/GameCard/GameCard';
import GameCardModal from '../../components/GameCardModal/GameCardModal';
import NewGameCardButton from '../../components/NewElementButton/NewElementButton';

const GameCardsView = (props: ICardsView): JSX.Element => {
  const { cards, modal, units, deleteCard } = props;

  return (
    <Box>
      <Stack direction="row" w="100" justify="center">
        <NewGameCardButton openModal={modal.openModal} description="Add card" />
      </Stack>

      <Stack w="100%" wrap="wrap" direction="row">
        {cards.map(card => {
          const id = card.value;

          const data: ICardData = {
            card,
            edit: modal.openModal,
            units,
            deleteCard,
          };

          return (
            <Stack key={`${id}-wrap`}>
              <GameCard {...data} key={id} />;
            </Stack>
          );
        })}

        <GameCardModal modal={modal} />
      </Stack>
    </Box>
  );
};

export default GameCardsView;
