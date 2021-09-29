import React from 'react';

import { Stack } from '@chakra-ui/react';

import { QuestionIcon } from '@chakra-ui/icons';
import { useTypedSelector } from '../../redux/store';
import GameCard from '../../components/GameCard/GameCard';
import { ISettings } from '../../../../shared/types/settings';
import { ICardData } from '../../../../shared/types/session/card';

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

  const renderVotingResults = (): JSX.Element => {
    const card =
      game && game.votes
        ? cards.find(card => card.value === game.votes[id])
        : undefined;

    if (!card) return <QuestionIcon color="facebook.300" w={6} h={6} />;

    const cardData: ICardData = {
      card,
      units: scoreTypeShort,
      isGameStage: true,
      isUnitsHidden: true,
      size: 'xs',
    };

    return <GameCard {...cardData} />;
  };

  return (
    <Stack
      w="100px"
      h="70px"
      justify="center"
      align="center"
      p="10px 10px"
      boxShadow="lg"
      style={{ marginInlineStart: '0' }}
    >
      {renderVotingResults()}
    </Stack>
  );
};

export default UserVote;
