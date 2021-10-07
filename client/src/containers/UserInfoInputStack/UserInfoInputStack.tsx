import {
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';

import { ChangeEvent } from 'react';
import { UserInfo } from '../../../../shared/types/user/user-info';

export interface IUserInfoInputStackProps extends UserInfo {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isNameInvalid: boolean;
}

const UserInfoInputStack = (props: IUserInfoInputStackProps) => {
  return (
    <Stack w="100%" maxW="300px" spacing={3}>
      <FormControl isInvalid={props.isNameInvalid} pos="relative">
        <FormLabel fontWeight="normal" fontStyle="italic">
          Your first name:
        </FormLabel>
        <Input
          name="name"
          value={props.name}
          onChange={props.onChange}
          size="md"
          isRequired={true}
        />
        <FormErrorMessage pos="absolute" right="5px" bottom="0px">
          <Text fontStyle="italic">Name is required</Text>
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="normal" fontStyle="italic">
          Your last name:
        </FormLabel>
        <Input
          name="surname"
          value={props.surname}
          onChange={props.onChange}
          size="md"
        />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="normal" fontStyle="italic">
          Your job position:
        </FormLabel>
        <Input
          name="jobPosition"
          value={props.jobPosition}
          onChange={props.onChange}
          size="md"
        />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export default UserInfoInputStack;
