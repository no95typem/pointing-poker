import { LocaleKey } from '../locales/locale';
import { useTypedSelector } from '../redux/store';

export const useLocale = (): Record<LocaleKey, string> => {
  return useTypedSelector(state => state.locale);
};
