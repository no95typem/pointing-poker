import { Button, Flex } from '@chakra-ui/react';

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
        border={variant ? 'unset' : '1px solid black'}
        w="130px"
        p="0 10px"
        variant={variant ? variant : 'solid'}
        // visibility={isHidden ? 'hidden' : 'visible'}
        isDisabled={isHidden}
        onClick={onClick}
      >
        {text}
      </Button>
    );
  };

  return (
    <Flex position="relative" align="center" justify="center" gridGap={2}>
      {renderButton(first)}

      {renderButton(second)}

      {isLoading && <ChakraLoader />}
    </Flex>
  );
};

export default ButtonsSet;
