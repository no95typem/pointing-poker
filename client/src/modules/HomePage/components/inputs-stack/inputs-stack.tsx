import { ChangeEvent } from 'react';
import {
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useTypedSelector, useAppDispatch } from '../../../../redux/store';
import {
  changeName,
  changeSurname,
  changeJobPosition,
} from '../../../../redux/slices/userInfo';

const InputsStack = () => {
  const dispatch = useAppDispatch();
  const { name, surname, jobPosition } = useTypedSelector(
    state => state.userInfo,
  );

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
