import {
  Box,
  Button,
  CircularProgress,
  keyframes,
  Text,
  usePrefersReducedMotion,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as UndrawAuthentication } from '../../../../assets/images/undraw/authentication.svg';
import { dang_APP_SOFT_RESET } from '../../../../redux/store-soft-reset';

const easeInOpacity = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const AdmitAwaitPage = React.memo(() => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${easeInOpacity} 1s linear 0.2s 1 normal forwards`;

  return (
    <VStack gridGap="2" animation={animation} opacity="0">
      <Box w="400px" maxW="60%">
        <UndrawAuthentication />
      </Box>

      <Text fontSize="lg" fontStyle="italic">
        Waiting for dealer's admission...
      </Text>
      <CircularProgress isIndeterminate color="gray.400" size="100px" />
      <Button onClick={dang_APP_SOFT_RESET}>Cancel</Button>
    </VStack>
  );
});

//Please wait until connection to server will be established
