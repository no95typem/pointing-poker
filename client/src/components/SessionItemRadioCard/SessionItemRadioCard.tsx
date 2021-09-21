import React from 'react';
import { Box, useRadio } from '@chakra-ui/react';

const SessionItemRadioCard = (props: any): JSX.Element => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();

  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default SessionItemRadioCard;
