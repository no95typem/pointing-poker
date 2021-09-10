import { CircularProgress, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export interface GenericLoadPageProps {
  text: string;
}

export const GenericLoadPage = (props: GenericLoadPageProps): JSX.Element => {
  return (
    <VStack>
      <Text>{props.text}</Text>
      <CircularProgress isIndeterminate color="blue.400" />
    </VStack>
  );
};

//Please wait until connection to server will be established
