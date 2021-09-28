//  Kaesid - Дефолтный дизайн карт мне не нравится, свой я еще не придумал. Так что, пока заглушка.

import React from 'react';

import { Stack, IconButton, Heading, Text } from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { CloseIcon } from '@chakra-ui/icons';

import { ICardData } from '../../../../shared/types/session/card';

const GameCard = (props: ICardData): JSX.Element => {
  const { card, edit, units, deleteCard, isGameStage } = props;

  const { value, base64 } = card;

  const stackStyles =
    props.size === 'xs'
      ? {
          w: '40px',
          height: '56px',
          p: '2px 2px',
          boxShadow: 'sm',
          borderRadius: 'md',
        }
      : {
          w: '150px',
          height: '210px',
          p: '10px 10px',
          boxShadow: 'lg',
          borderRadius: 'md',
        };

  const isNumber = !Number.isNaN(Number.parseFloat(value));

  const valueStyles =
    props.size === 'xs'
      ? { fontSize: 'md', mb: '0px' }
      : { fontSize: isNumber ? '4xl' : 'xl', maxW: '130px', mb: '20px' };

  const unitsSizeStyles =
    props.size === 'xs' ? { fontSize: 'xs', mt: '0' } : { size: 'lg' };

  return (
    <Stack
      position="relative"
      direction="column"
      justify="center"
      align="center"
      {...stackStyles}
    >
      {!isGameStage && (
        <>
          <IconButton
            position="absolute"
            aria-label="edit"
            background="transparent"
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
            top="0"
            right="0"
            size="lg"
            icon={<CloseIcon />}
            onClick={deleteCard && (() => deleteCard(value))}
          />
        </>
      )}

      <Text
        fontStyle="italic"
        fontWeight="bold"
        maxW="90%"
        isTruncated
        {...valueStyles}
      >
        {value}
      </Text>
      {base64 ? (
        // img src={base64}
        <Heading fontStyle="italic" {...unitsSizeStyles}>
          {base64}
        </Heading>
      ) : props.isUnitsShown ? (
        <Text
          fontStyle="italic"
          pos="absolute"
          bottom="10px"
          maxW="90%"
          h="1rem"
          isTruncated
          {...unitsSizeStyles}
        >
          {units}
        </Text>
      ) : undefined}
    </Stack>
  );
};

export default GameCard;
