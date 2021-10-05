import { useState } from 'react';
import { useRadioGroup, UseRadioGroupReturn } from '@chakra-ui/react';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import { ICardsRound } from '../../../../shared/types/session/card';
import ChoosingCards from '../../components/SettingsTabs/ChoosingCards/ChoosingCards';

const GameCardsRound = (props: ICardsRound): JSX.Element => {
  const [selectedRadioValue, setSelectedRadioValue] = useState('');

  const pick = (value: string) => {
    setSelectedRadioValue(value);

    SERVER_ADAPTER.pickCard(value);
  };

  const radioprops: UseRadioGroupReturn = useRadioGroup({
    name: 'gameCardsRound',
    value: selectedRadioValue,
    onChange: pick,
  });

  return <ChoosingCards cardsData={props} radioProps={radioprops} />;
};

export default GameCardsRound;
