import { SettingsValue } from '../../../shared/types/settings';
import { setSettings } from '../redux/slices/settings';
import { useAppDispatch, useTypedSelector } from '../redux/store';
import { SERVER_ADAPTER } from '../modules/ServerAdapter/serverAdapter';

const useLocalSettings = () => {
  const dispatch = useAppDispatch();

  const localSettings = useTypedSelector(state => state.settings);

  const setLocalSettings = (name: string, value: SettingsValue): void => {
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
