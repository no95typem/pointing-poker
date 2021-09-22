//  Kaesid - Дефолтный дизайн карт мне не нравится, свой я еще не придумал. Так что, пока заглушка.

import React from 'react';

import { Stack, IconButton, Heading, Text } from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { CloseIcon } from '@chakra-ui/icons';

import { ICardData } from '../../../../shared/types/session/card';

const GameCard = (props: ICardData): JSX.Element => {
  const { card, edit, units, deleteCard, isGameStage } = props;

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
      <Text
        fontSize="2xl"
        maxW="130px"
        fontStyle="italic"
        fontWeight="bold"
        isTruncated
        mb="20px"
      >
        {value}
      </Text>
      {base64 ? (
        // img src={base64}
        <Heading fontStyle="italic" size="lg">
          {base64}
        </Heading>
      ) : (
        <Heading fontStyle="italic" size="lg">
          {units}
        </Heading>
      )}
      <IconButton
        position="absolute"
        aria-label="edit"
        background="transparent"
        visibility={isGameStage ? 'hidden' : 'visible'}
        top="0"
        left="0"
        size="lg"
        icon={<ImPencil />}
        onClick={edit && (() => edit(value))}
      />
      <IconButton
        position="absolute"
        aria-label="delete"
        background="transparent"
        visibility={isGameStage ? 'hidden' : 'visible'}
        top="0"
        right="0"
        size="lg"
        icon={<CloseIcon />}
        onClick={deleteCard && (() => deleteCard(value))}
      />
    </Stack>
  );
};

export default GameCard;
