import {
  KnownErrorsKey,
  KNOWN_ERRORS_KEYS,
} from '../../../shared/knownErrorsKeys';
import { setErrorByKey } from '../redux/slices/errors';
import { useAppDispatch } from '../redux/store';

export const useRedirectionToError = () => {
  const dispatch = useAppDispatch();

  return (key?: KnownErrorsKey) => {
    dispatch(setErrorByKey(key || KNOWN_ERRORS_KEYS.UNKNOWN_ERROR));
  };
};
