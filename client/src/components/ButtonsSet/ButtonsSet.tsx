import React from 'react';
import { Button, Stack } from '@chakra-ui/react';

import ChakraLoader from '../Loader/ChakraLoader';

export interface IButtonsSetData {
  first: IButtonData;
  second: IButtonData;
  isLoading: boolean;
}

export interface IButtonData {
  onClick: () => void;
  text: string;
  isHidden?: boolean;
  variant?: string;
}

const ButtonsSet = (props: IButtonsSetData): JSX.Element => {
  const { first, second, isLoading } = props;

  const renderButton = ({
    isHidden,
    onClick,
    text,
    variant,
  }: IButtonData): JSX.Element => {
    return (
      <Button
        colorScheme="facebook"
        w="130px"
        p="0 10px"
        variant={variant ? variant : 'solid'}
        visibility={isHidden ? 'hidden' : 'visible'}
        onClick={onClick}
      >
        {text}
      </Button>
    );
  };

  return (
    <Stack
      position="relative"
      direction="row"
      align="center"
      justify={['space-evenly', 'space-between']}
      maxW="320px"
      mb="20px"
    >
      {renderButton(first)}

      {renderButton(second)}

      {isLoading && <ChakraLoader />}
    </Stack>
  );
};

export default ButtonsSet;
