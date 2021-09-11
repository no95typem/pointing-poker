import React from 'react';
import { useRadioGroup, HStack } from '@chakra-ui/react';
import RadioCard from './radio-card';

const RadioButtons = () => {
  const options = ['Player', 'Spectator'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: 'Player',
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map(value => {
        const radio = (getRadioProps as (obj: { value: string }) => any)({
          value,
        });

        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default RadioButtons;
