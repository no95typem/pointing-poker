import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { SERVER_ADAPTER } from '../modules/ServerAdapter/serverAdapter';
import { DEFAULT_REDUCER, store, STORE_INIT_STATE } from './store';

const softResetReducer = () => {
  return OBJ_PROCESSOR.deepClone(STORE_INIT_STATE);
};

const dang_STORE_SOFT_RESET = () => {
  store.replaceReducer(softResetReducer);
  store.dispatch({ type: 'reset' });
  store.replaceReducer(DEFAULT_REDUCER);
};

export const dang_APP_SOFT_RESET = () => {
  SERVER_ADAPTER.exitGame();
  dang_STORE_SOFT_RESET();
};
