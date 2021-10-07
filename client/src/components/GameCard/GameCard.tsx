import {
  Stack,
  IconButton,
  Text,
  Image,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { CloseIcon } from '@chakra-ui/icons';

import { ICardData } from '../../../../shared/types/session/card';

import styles from './styles.module.scss';
import { getBorderStyles } from '../../constants';

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
          className: `enlight ${styles['enlight-sm']}`,
        }
      : {
          w: '150px',
          height: '210px',
          p: '10px 10px',
          boxShadow: 'lg',
          borderRadius: 'lg',
          className: 'enlight',
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
        borderRadius={props.size === 'xs' ? 'sm' : 'md'}
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

  const cMode = useColorMode();

  const borderStyles = getBorderStyles(cMode.colorMode);

  return (
    <Tooltip label={value} aria-label="Card value" openDelay={500}>
      <Stack
        position="relative"
        direction="column"
        justify="center"
        align="center"
        overflow="hidden"
        {...stackStyles}
        backgroundColor={
          cMode.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.0'
        }
        {...{ ...borderStyles, borderTopRadius: undefined }}
      >
        {isControlShown && (
          <>
            <IconButton
              position="absolute"
              aria-label="edit"
              background="transparent"
              top="2px"
              left="2px"
              size="md"
              icon={<ImPencil />}
              onClick={edit && (() => edit(value))}
            />
            <IconButton
              position="absolute"
              aria-label="delete"
              background="transparent"
              top="2px"
              right="2px"
              size="md"
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
