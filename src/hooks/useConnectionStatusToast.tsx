import { useToast } from '@chakra-ui/toast';
import { useEffect } from 'react';
import { useTypedSelector } from '../redux/store';
import { useLocale } from './useLocale';

export const useConnectionStatusToast = () => {
  const connectState = useTypedSelector(state => state.connect);
  const toast = useToast();
  const locale = useLocale();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (connectState.serverConnectionStatus === 'connected') {
      toast({
        title: locale.APP_SERVER_CONNECTION_STATUS_TOAST_TITLE,
        description: locale.APP_SERVER_CONNECTION_STATUS_TOAST_DESC,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [connectState.serverConnectionStatus]);
  /* eslint-enable react-hooks/exhaustive-deps */
};
