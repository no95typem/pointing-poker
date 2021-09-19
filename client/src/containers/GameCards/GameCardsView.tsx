import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import { ICardData, ICardsView } from '../../../../shared/types/session/card';

import GameCard from '../../components/GameCard/GameCard';
import GameCardModal from '../../components/GameCardModal/GameCardModal';
import NewGameCardButton from '../../components/NewGameCardButton/NewGameCardButton';
import { LOCALE_US } from '../../locales/locale-us';

const IssueCardView = (props: ICardsView): JSX.Element => {
  const { cards, modal, units, deleteCard } = props;

  return (
    <Box mb="30px">
      <Heading mb="20px" size="md">
        {LOCALE_US.SETTINGS_CARDS_HEADER}
      </Heading>

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

        <NewGameCardButton onClick={modal.openModal} />

        <GameCardModal modal={modal} />
      </Stack>
    </Box>
  );
};

export default IssueCardView;
