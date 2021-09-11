import React from 'react';

import { Stack } from '@chakra-ui/react';

import { ICardsView } from '../../../../shared/types/session/card';

import GameCard from '../../components/GameCard/GameCard';
import GameCardModal from '../../components/GameCardModal/GameCardModal';
import NewGameCardButton from '../../components/newGameCardButton/NewGameCardButton';

const IssueCardView = (props: ICardsView): JSX.Element => {
  const { cards, modal } = props;

  return (
    <Stack w="100%" wrap="wrap" direction="row">
      {cards.map(card => {
        const id = card.value;

        return (
          <Stack key={`${id}-wrap`}>
            <GameCard card={card} onClick={modal.onClick} key={id} />;
          </Stack>
        );
      })}

      <NewGameCardButton onClick={modal.onClick} />

      <GameCardModal card={modal} />
    </Stack>
  );
};

export default IssueCardView;
