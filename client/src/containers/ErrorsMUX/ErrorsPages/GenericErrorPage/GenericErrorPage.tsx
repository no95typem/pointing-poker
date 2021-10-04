import { Alert, AlertIcon, Button, VStack } from '@chakra-ui/react';
import { AppError } from '../../../../knownErrors';
import { KnownErrorsKey } from '../../../../../../shared/knownErrorsKeys';
import { dang_APP_SOFT_RESET } from '../../../../redux/store-soft-reset';

export interface GenericErrorPageProps {
  key?: KnownErrorsKey;
  error: AppError;
}

export const GenericErrorPage = (props: GenericErrorPageProps) => {
  return (
    <VStack>
      <Alert status="error" maxW="500px">
        <AlertIcon />
        {props.error.description}
      </Alert>
      <Button
        border="1px solid black"
        onClick={() => {
          dang_APP_SOFT_RESET();
        }}
      >
        Reload app
      </Button>
    </VStack>
  );
};
