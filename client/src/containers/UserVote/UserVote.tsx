import React from 'react';

import { Stack } from '@chakra-ui/react';

import { QuestionIcon } from '@chakra-ui/icons';
import { useTypedSelector } from '../../redux/store';
import GameCard from '../../components/GameCard/GameCard';
import { ISettings } from '../../../../shared/types/settings';
import { CardData } from '../../../../shared/types/session/card';

interface IVote {
  id: number;
}

const UserVote = (props: IVote): JSX.Element => {
  const { id } = props;

  const game = useTypedSelector(state => state.session.game);

  const settings: ISettings = useTypedSelector(
    state => state.session.gSettings,
  );

  const { cards, scoreTypeShort } = settings;

  let card: CardData | undefined;

  !game || !game.votes
    ? (card = undefined)
    : (card = cards.find(card => card.value === game.votes[id]));

  return (
    <Stack
      w="100px"
      h="70px"
      justify="center"
      align="center"
      p="10px 10px"
      boxShadow="lg"
    >
      {card ? (
        <GameCard card={card} units={scoreTypeShort} isGameStage={true} />
      ) : (
        <QuestionIcon color="facebook.300" w={6} h={6} />
      )}
    </Stack>
  );
};

export default UserVote;
