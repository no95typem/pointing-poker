import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { RootState } from '../../../../redux/store';
import { userInfoSlice } from '../../../../redux/slices/userInfo';

const InputsStack = () => {
  const dispatch = useDispatch();
  const { name, surname, jobPosition } = useSelector(
    (state: RootState) => state.userInfo,
  );

  const { changeName, changeSurname, changeJobPosition } =
    userInfoSlice.actions;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return dispatch(changeName(value));
      case 'surname':
        return dispatch(changeSurname(value));
      case 'jobPosition':
        return dispatch(changeJobPosition(value));
      default:
        return;
    }
  };

  return (
    <Stack w="60%" spacing={3}>
      <FormControl>
        <FormLabel>Your first name:</FormLabel>
        <Input
          name="name"
          value={name}
          onChange={handleChange}
          size="md"
          isRequired
        />
        <FormErrorMessage>Name is required</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Your last name:</FormLabel>
        <Input
          name="surname"
          value={surname}
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
