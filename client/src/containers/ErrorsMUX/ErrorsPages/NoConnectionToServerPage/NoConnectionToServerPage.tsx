import React from 'react';
import { Alert, AlertIcon, Button, VStack } from '@chakra-ui/react';
import { SERVER_ADAPTER } from '../../../../modules/ServerAdapter/ServerAdapter';

export const NoConnectionToServerPage = () => {
  return (
    <VStack>
      <Alert status="error" maxW="fit-content">
        <AlertIcon />
        Sorry, we can't establish a connection to the server
      </Alert>
      <Button onClick={() => SERVER_ADAPTER.connect()}>
        Press to try to reconnect
      </Button>
    </VStack>
  );
};
