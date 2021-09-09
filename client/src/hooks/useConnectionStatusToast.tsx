import { useToast } from '@chakra-ui/toast';
import { useEffect } from 'react';
import { useTypedSelector } from '../redux/store';

export const useConnectionStatusToast = () => {
  const connectState = useTypedSelector(state => state.connect);
  const toast = useToast();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (connectState.wsConnectionStatus === 'alive') {
      toast({
        title: 'Connection status',
        description: 'Succesfully connect to a server',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [connectState.wsConnectionStatus]);
  /* eslint-enable react-hooks/exhaustive-deps */
};
