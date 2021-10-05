import { useState } from 'react';
import { useRadioGroup, UseRadioGroupReturn } from '@chakra-ui/react';

import { ICardsStatistic } from '../../../../shared/types/session/card';

import ChoosingCards from '../../components/SettingsTabs/ChoosingCards/ChoosingCards';

const GameCardValueButtons = (props: ICardsStatistic): JSX.Element => {
  const { setIssueValue, value = '' } = props;

  const [selectedRadioValue, setSelectedRadioValue] = useState(value);

  const selectCard = (value: string) => {
    setSelectedRadioValue(value);

    setIssueValue(value);
  };

  const radioprops: UseRadioGroupReturn = useRadioGroup({
    name: 'gameCardValueButtons',
    value: selectedRadioValue,
    onChange: selectCard,
  });

  return <ChoosingCards cardsData={props} radioProps={radioprops} />;
};

export default GameCardValueButtons;
