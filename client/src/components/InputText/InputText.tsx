import React from 'react';

import { FormLabel, FormControl, Input } from '@chakra-ui/react';

import { ISettingsComponentData } from '../../../../shared/types/settings';

const InputText = (props: ISettingsComponentData): JSX.Element => {
  const { data } = props;

  const { name, label, value, onChange } = data;

  const setData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target;

    onChange(input.name, input.value);
  };

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel htmlFor={name} mb="0">
        {label}
      </FormLabel>
      <Input
        boxShadow="md"
        w="60%"
        maxW="150px"
        border="black 2px solid"
        id={name}
        name={name}
        value={value as string}
        onChange={setData}
      />
    </FormControl>
  );
};

export default InputText;
