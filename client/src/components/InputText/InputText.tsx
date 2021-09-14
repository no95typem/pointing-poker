import React from 'react';

import { FormLabel, FormControl, Input } from '@chakra-ui/react';

import { ISettingsComponentData } from '../../../../shared/types/settings';

const InputText = (props: ISettingsComponentData): JSX.Element => {
  const { data } = props;

  const { name, label } = data;

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel htmlFor={name} mb="0">
        {label}
      </FormLabel>
      <Input boxShadow="md" w="60%" border="black 2px solid" id={name} />
    </FormControl>
  );
};

export default InputText;
