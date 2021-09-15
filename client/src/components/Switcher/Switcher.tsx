import React from 'react';

import { FormLabel, FormControl, Switch } from '@chakra-ui/react';

import { ISettingsComponentData } from '../../../../shared/types/settings';

const Switcher = (props: ISettingsComponentData): JSX.Element => {
  const { data } = props;

  const { name, label, value } = data;

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel htmlFor={name} mb="0">
        {label}
      </FormLabel>
      <Switch
        colorScheme="green"
        id={name}
        name={name}
        isChecked={value as boolean}
      />
    </FormControl>
  );
};

export default Switcher;
