import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { CustomArrowProps } from 'react-slick';

const SliderCustomArrow = (props: CustomArrowProps): JSX.Element => {
  const { className, style, onClick } = props;

  const theme = useColorMode();

  return (
    <Box
      className={className}
      _before={{ color: theme.colorMode === 'light' ? 'black' : 'white' }}
      display="block"
      m="0 5px"
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
};

export default SliderCustomArrow;
