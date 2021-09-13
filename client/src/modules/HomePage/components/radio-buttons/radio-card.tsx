import React from 'react';
import { useRadio, Box } from '@chakra-ui/react';

// interface Props {
//   props:
// }

const RadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'facebook.600',
          color: 'white',
          borderColor: 'facebook.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        w="10rem"
        textAlign="center"
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
