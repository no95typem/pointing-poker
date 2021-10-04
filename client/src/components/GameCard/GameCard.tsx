import React from 'react';
import { Stack, IconButton, Text, Image, Tooltip } from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { CloseIcon } from '@chakra-ui/icons';

import { ICardData } from '../../../../shared/types/session/card';

const GameCard = (props: ICardData): JSX.Element => {
  const { card, edit, units, deleteCard, isUnitsHidden, isControlShown } =
    props;

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

  let content: JSX.Element;

  if (base64) {
    content = (
      <Image
        // style={{ marginTop: '0' }}
        src={base64}
        maxW="80%"
        maxH="50%"
        objectFit="contain"
        alt={value}
      />
    );
  } else {
    content = (
      <>
        <Text
          fontStyle="italic"
          fontWeight="bold"
          maxW="90%"
          isTruncated
          {...valueStyles}
        >
          {value}
        </Text>
        {!isUnitsHidden && (
          <Text
            fontStyle="italic"
            pos="absolute"
            bottom="10%"
            maxW="90%"
            h="2rem"
            style={{ marginTop: '0' }}
            isTruncated
            {...unitsSizeStyles}
          >
            {units}
          </Text>
        )}
      </>
    );
  }

  return (
    <Tooltip label={value} aria-label="Card value" openDelay={500}>
      <Stack
        position="relative"
        direction="column"
        justify="center"
        align="center"
        {...stackStyles}
      >
        {isControlShown && (
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
              style={{ marginTop: '0' }}
              icon={<CloseIcon />}
              onClick={deleteCard && (() => deleteCard(value))}
            />
          </>
        )}

        {content}
      </Stack>
    </Tooltip>
  );
};

export default GameCard;
