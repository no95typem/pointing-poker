import React from 'react';

import { FormLabel, FormControl, Switch } from '@chakra-ui/react';

import { ISettingsComponentData } from '../../../../shared/types/settings';

const Switcher = (props: ISettingsComponentData): JSX.Element => {
  const { data } = props;

  const { name, label, value, onChange } = data;

  const setData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target;

    onChange(input.name, input.checked);
  };

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="100%"
    >
      <FormLabel htmlFor={name} mb="0">
        {label}
      </FormLabel>
      <Switch
        colorScheme="green"
        id={name}
        name={name}
        isChecked={value as boolean}
        onChange={setData}
        opacity="0.9"
      />
    </FormControl>
  );
};

export default Switcher;
