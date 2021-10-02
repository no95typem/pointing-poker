import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { connectSlice } from './slices/connect';
import { errorsSlice } from './slices/errors';
import { homePageSlice } from './slices/home-page';
import { loadsSlice } from './slices/loads';
import { localeSlice } from './slices/locale';
import { mockSessionSlice } from './slices/mockSession';
import { sessionSlice } from './slices/session';
import { settingsSlice } from './slices/settings';
import { userInfoSlice } from './slices/userInfo';
import { chatSlice } from './slices/chat';
import { notifSlice } from './slices/notifications';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';

export const COMBINED_REDUCER = combineReducers({
  homePage: homePageSlice.reducer,
  locale: localeSlice.reducer,
  errors: errorsSlice.reducer,
  loads: loadsSlice.reducer,
  connect: connectSlice.reducer,
  session: sessionSlice.reducer,
  userInfo: userInfoSlice.reducer,
  chat: chatSlice.reducer,
  settings: settingsSlice.reducer,
  alerts: notifSlice.reducer,
});

export type RootState = ReturnType<typeof COMBINED_REDUCER>;

let INIT_STATE: RootState;

const rootReducer = (state: RootState = INIT_STATE, action: Action) => {
  if (action.type === 'DANG_APP_SOFT_RESET') {
    return OBJ_PROCESSOR.deepClone(INIT_STATE);
  }
  return COMBINED_REDUCER(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

INIT_STATE = store.getState();

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
