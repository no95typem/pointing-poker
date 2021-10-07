import React from 'react';
import { useRadio, Box, useColorMode } from '@chakra-ui/react';

export const ButtonLikeRadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const cMode = useColorMode();

  const bgColor =
    cMode.colorMode === 'light' ? 'gray.100' : 'rgba(255, 255, 255, 0.08)';

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: bgColor,
          transform: 'scale(1) !important',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        w="8rem"
        textAlign="center"
        py={1.5}
        style={{ transform: 'scale(0.8)' }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
