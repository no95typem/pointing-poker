//  Kaesid - Дефолтный дизайн карт мне не нравится, свой я еще не придумал. Так что, пока заглушка.

import React from 'react';

import { Stack, IconButton, Heading } from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';

import { ICardData } from '../../../../shared/types/session/card';

const GameCard = (props: ICardData): JSX.Element => {
  const { card, onClick } = props;

  const { value, base64 } = card;

  return (
    <Stack
      position="relative"
      w="150px"
      height="210px"
      direction="column"
      justify="center"
      align="center"
      p="10px 10px"
      boxShadow="lg"
    >
      <Heading size="2xl">{value}</Heading>
      <Heading fontStyle="italic" size="xl">
        {base64}
      </Heading>
      <IconButton
        position="absolute"
        aria-label="edit"
        background="transparent"
        visibility={true ? 'visible' : 'hidden'}
        top="0"
        right="0"
        size="lg"
        icon={<ImPencil />}
        onClick={() => onClick(value)}
      />
    </Stack>
  );
};

export default GameCard;
