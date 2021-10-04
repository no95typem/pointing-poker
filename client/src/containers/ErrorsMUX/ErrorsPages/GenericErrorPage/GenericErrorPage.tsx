import React from 'react';
import { Alert, AlertIcon, Button, VStack } from '@chakra-ui/react';
import { AppError } from '../../../../knownErrors';
import { useHistory } from 'react-router-dom';
import { KnownErrorsKey } from '../../../../../../shared/knownErrorsKeys';

export interface GenericErrorPageProps {
  key?: KnownErrorsKey;
  error: AppError;
}

export const GenericErrorPage = (props: GenericErrorPageProps) => {
  const history = useHistory();

  return (
    <VStack>
      <Alert status="error" maxW="500px">
        <AlertIcon />
        {props.error.description}
      </Alert>
      <Button
        border="1px solid black"
        onClick={() => {
          history.push('');
          window.location.reload();
        }}
      >
        Reload app
      </Button>
    </VStack>
  );
};
