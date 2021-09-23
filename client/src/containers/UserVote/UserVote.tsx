import React from 'react';

import { Stack } from '@chakra-ui/react';

import { QuestionIcon } from '@chakra-ui/icons';
import { useTypedSelector } from '../../redux/store';
import GameCard from '../../components/GameCard/GameCard';

interface IVote {
  id: number;
}

const UserVote = (props: IVote): JSX.Element => {
  const { id } = props;

  const game = useTypedSelector(state => state.session.game);

  const settings = useTypedSelector(state => state.session.currentGameSettings);

  const { cards, scoreTypeShort } = settings;

  if (!game || !game.votes) return <></>;

  const card = cards.find(card => card.value === game.votes[id]);

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
