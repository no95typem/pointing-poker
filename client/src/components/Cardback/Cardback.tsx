import React from 'react';
import { Stack } from '@chakra-ui/react';

interface ICardback {
  src: string;
  size?: 'xs' | 'xl';
}

const Cardback = (props: ICardback): JSX.Element => {
  const { size, src } = props;

  const stackStyles =
    size === 'xs'
      ? {
          w: '40px',
          height: '56px',
          boxShadow: 'sm',
          borderRadius: 'md',
        }
      : {
          w: '150px',
          height: '210px',
          boxShadow: 'lg',
          borderRadius: 'md',
        };

  return (
    <Stack
      position="relative"
      direction="column"
      justify="center"
      align="center"
      bgImg={src}
      bgSize="cover"
      {...stackStyles}
    ></Stack>
  );
};

export default Cardback;
