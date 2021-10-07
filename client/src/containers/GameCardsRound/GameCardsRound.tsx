import { useRadioGroup, UseRadioGroupReturn } from '@chakra-ui/react';
import { ICardsRound } from '../../../../shared/types/session/card';
import ChoosingCards from '../../components/SettingsTabs/ChoosingCards/ChoosingCards';

const GameCardsRound = (props: ICardsRound): JSX.Element => {
  const { selectedCardValue, pickCard } = props;

  const radioprops: UseRadioGroupReturn = useRadioGroup({
    name: 'gameCardsRound',
    value: selectedCardValue,
    onChange: pickCard,
  });

  return <ChoosingCards cardsData={props} radioProps={radioprops} />;
};

export default GameCardsRound;
