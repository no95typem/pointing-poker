import React from 'react';

import { Alert, AlertIcon, Stack, Button, useToast } from '@chakra-ui/react';

const Alerts = (): JSX.Element => {
  const toast = useToast();

  return (
    <Stack spacing={3}>
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>
      <Alert status="success">
        <AlertIcon />
        Data uploaded to the server. Fire on!
      </Alert>
      <Alert status="warning">
        <AlertIcon />
        Seems your account is about expire, upgrade now
      </Alert>
      <Alert status="info">
        <AlertIcon />
        Chakra is going live on August 30th. Get ready!
      </Alert>
      <Button
        onClick={() =>
          toast({
            title: 'Custom Error.',
            description: 'error message',
            status: 'error',
            duration: 1200,
            isClosable: true,
          })
        }
      >
        Show timed error message
      </Button>
    </Stack>
  );
};

export default Alerts;
