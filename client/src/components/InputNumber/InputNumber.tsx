import React from 'react';

import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

export interface INumberInput {
  setTime: (name: string, value: number) => void;
  validateTime: (units: 'minutes' | 'seconds') => void;
  units: 'minutes' | 'seconds';
  value: number;
}

const InputNumber = (props: INumberInput): JSX.Element => {
  const { value, units, setTime, validateTime } = props;

  const changeTime = (value: string): void => {
    setTime(units, +value);
  };

  return (
    <FormControl>
      <FormLabel
        position="absolute"
        htmlFor={units}
        fontSize="13px"
        top="-20px"
      >
        {units}
      </FormLabel>
      <NumberInput
        position="relative"
        w="55px"
        value={value}
        onChange={changeTime}
        onBlur={() => validateTime(units)}
        min={0}
        max={59}
        id={units}
        borderRadius="6px"
      >
        <NumberInputField
          textAlign="center"
          padding="0 5px"
          fontWeight="600"
          fontSize="36px"
        />
      </NumberInput>
    </FormControl>
  );
};

export default InputNumber;
