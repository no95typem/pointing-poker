//! Обзательны только два параметра для кнопки: внутренний текст, и ширина.
//! Высота у всех кнопок, судя по макету, одинакова. Ее и шрифт зададим уже отдельно, для всего проекта.

import React from 'react';

import { Button } from '@chakra-ui/react';

import { IButtonData } from './buttonTypes';

const ActionButton = (props: IButtonData): JSX.Element => {
  const { data } = props;

  const {
    text,
    width,
    isLoading = false,
    isCofirmButton = true,
    loadingText = '',
    onClick,
  } = data;

  const variant = isCofirmButton ? 'solid' : 'outline';

  return (
    <Button
      colorScheme="facebook"
      w={width}
      variant={variant}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
