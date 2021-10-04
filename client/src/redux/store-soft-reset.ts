import { SERVER_ADAPTER } from '../modules/ServerAdapter/serverAdapter';
import { store } from './store';
import { setFullLocalUserInfo } from './slices/userInfo';
import { setSettings } from './slices/settings';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';

const dang_STORE_SOFT_RESET = () => {
  const state = store.getState();
  const userInfo = OBJ_PROCESSOR.deepClone(state.userInfo);
  const settings = OBJ_PROCESSOR.deepClone(state.settings);
  store.dispatch({ type: 'DANG_APP_SOFT_RESET' });
  store.dispatch(setFullLocalUserInfo(userInfo));
  store.dispatch(setSettings(settings));
};

export const dang_APP_SOFT_RESET = () => {
  SERVER_ADAPTER.exitGame(true);

  dang_STORE_SOFT_RESET();
};
