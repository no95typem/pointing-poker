import React from 'react';

import { ButtonGroup } from '@chakra-ui/react';

import ActionButton from '../../../components/Button/Button';
import { IButton } from '../../../components/Button/buttonTypes';

interface IButtonsData {
  data: IButton[];
}

const ButtonsExampleView = (props: IButtonsData): JSX.Element => {
  const { data } = props;

  return (
    <ButtonGroup>
      {data.map(buttonData => {
        return (
          <ActionButton data={buttonData} key={JSON.stringify(buttonData)} />
        );
      })}
    </ButtonGroup>
  );
};

export default ButtonsExampleView;
