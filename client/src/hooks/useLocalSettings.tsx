import { CardData } from '../../../shared/types/session/card';
import { ISettings } from '../../../shared/types/settings';
import { setSettings } from '../redux/slices/settings';
import { useAppDispatch } from '../redux/store';

interface ISetSettings {
  setLocalSettings: (
    name: string,
    value: string | boolean | CardData[],
  ) => void;
}

const UseLocalSettings = (localSettings: ISettings): ISetSettings => {
  const dispatch = useAppDispatch();

  const setLocalSettings = (
    name: string,
    value: string | boolean | CardData[],
  ): void => {
    dispatch(setSettings({ ...localSettings, [name]: value }));
  };

  return {
    setLocalSettings,
  };
};

export default UseLocalSettings;
