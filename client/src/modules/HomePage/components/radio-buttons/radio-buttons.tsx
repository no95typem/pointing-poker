import React from 'react';
import { useRadioGroup, HStack } from '@chakra-ui/react';
import RadioCard from './radio-card';
import { USER_ROLES } from '../../../../../../shared/types/user/user-role';

const options = [USER_ROLES.PLAYER, USER_ROLES.SPECTATOR];

const RadioButtons = () => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: USER_ROLES.PLAYER,
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
