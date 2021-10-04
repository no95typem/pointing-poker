import { Box, useRadio } from '@chakra-ui/react';

const SessionItemRadioCard = (props: any): JSX.Element => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();

  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />

      <Box {...checkbox} _checked={{}} cursor="pointer">
        {props.children}
      </Box>
    </Box>
  );
};

export default SessionItemRadioCard;
