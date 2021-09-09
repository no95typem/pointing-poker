import React, { ChangeEvent } from 'react';
import {
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

interface Props {
  user: {
    firstName: string;
    lastName: string;
    jobPosition: string;
  };
  userChange: (name: string, value: string) => void;
}

const InputsStack = ({ user, userChange }: Props) => {
  const { firstName, lastName, jobPosition } = user;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    userChange(name, value);
  };

  return (
    <Stack w="60%" spacing={3}>
      <FormControl>
        <FormLabel>Your first name:</FormLabel>
        <Input
          name="firstName"
          value={firstName}
          onChange={handleChange}
          size="md"
          isRequired
        />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Your last name:</FormLabel>
        <Input
          name="lastName"
          value={lastName}
          onChange={handleChange}
          size="md"
        />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Your job position:</FormLabel>
        <Input
          name="jobPosition"
          value={jobPosition}
          onChange={handleChange}
          size="md"
        />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export default InputsStack;
