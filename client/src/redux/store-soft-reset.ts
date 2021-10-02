import { SERVER_ADAPTER } from '../modules/ServerAdapter/serverAdapter';
import { store } from './store';

const dang_STORE_SOFT_RESET = () => {
  store.dispatch({type: 'DANG_APP_SOFT_RESET'});
};

export const dang_APP_SOFT_RESET = () => {
  SERVER_ADAPTER.exitGame(true);
  dang_STORE_SOFT_RESET();
};
