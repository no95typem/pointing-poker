import { Alert, AlertIcon, Button, VStack } from '@chakra-ui/react';
import { SERVER_ADAPTER } from '../../../../modules/ServerAdapter/serverAdapter';

import { ReactComponent as UndrawServerDown } from '../../../../assets/images/undraw/server-down.svg';
import { dang_APP_SOFT_RESET } from '../../../../redux/store-soft-reset';

export const NoConnectionToServerPage = () => {
  return (
    <VStack w="100%" p={2} textAlign="justify">
      <UndrawServerDown style={{ maxWidth: '500px' }} />
      <Alert status="error" maxW="fit-content">
        <AlertIcon />
        Sorry, we can't establish a connection to the server
      </Alert>
      <Button
        colorScheme="green"
        onClick={() => {
          dang_APP_SOFT_RESET();
          SERVER_ADAPTER.connect();
        }}
      >
        Try to reconnect
      </Button>
    </VStack>
  );
};
