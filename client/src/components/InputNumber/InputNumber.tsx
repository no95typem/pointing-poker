import React from 'react';

import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

export interface INumberInput {
  units: string;
  value: number;
  setTime: (name: string, value: number) => void;
}

const InputNumber = (props: INumberInput): JSX.Element => {
  const { value, units, setTime } = props;

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
        min={0}
        max={59}
        id={units}
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
