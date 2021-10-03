import { CardData } from '../../../shared/types/session/card';
import { SERVER_ADAPTER } from '../modules/ServerAdapter/serverAdapter';
import { setSettings } from '../redux/slices/settings';
import { useAppDispatch, useTypedSelector } from '../redux/store';

const useLocalSettings = () => {
  const dispatch = useAppDispatch();

  const localSettings = useTypedSelector(state => state.settings);

  const setLocalSettings = (
    name: string,
    value: string | boolean | CardData[] | string[] | number,
  ): void => {
    const newSettings = { ...localSettings, [name]: value };

    dispatch(setSettings(newSettings));

    if (name === 'isAutoAdmit' || name === 'isDealerPlayer')
      SERVER_ADAPTER.sendSettings(true, newSettings);
  };

  return {
    localSettings,
    setLocalSettings,
  };
};

export default useLocalSettings;
