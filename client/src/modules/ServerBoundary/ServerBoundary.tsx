import React from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  CircularProgress,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../redux/store';
import { useEffect } from 'react';
import { SERVER_ADAPTER } from '../ServerAdapter/ServerAdapter';

export interface ServerBoundaryProps {
  children: React.ReactNode;
}

export const ServerBoundary = (props: ServerBoundaryProps) => {
  const toast = useToast();
  const status = useTypedSelector(state => state.connect.wsConnectionStatus);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === 'alive') {
      toast({
        title: 'Connection status',
        description: 'Succesfully connect to a server',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [status]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (!status || status === 'connecting')
    return (
      <VStack>
        <Text>Please wait until connection to server will be established</Text>
        <CircularProgress isIndeterminate color="blue.400" />
      </VStack>
    );

  if (status === 'dead')
    // ! TODO (no95typem)
    return (
      <VStack>
        <Alert status="error" maxW="fit-content">
          <AlertIcon />
          Sorry, no connection to the server
        </Alert>
        <Button onClick={() => SERVER_ADAPTER.connect()}>
          Try to reconnect
        </Button>
      </VStack>
    );

  return <>{props.children}</>;
};
