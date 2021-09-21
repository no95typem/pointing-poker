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

const dang_rootReducer = (state: any, action: Action) => {
  if (action.type === 'LOAD_STATE') {
    return (action as LoadStateAction).newState;
  }

  return state;
};

const rootReducer = combineReducers({
  homePage: homePageSlice.reducer,
  locale: localeSlice.reducer,
  errors: errorsSlice.reducer,
  loads: loadsSlice.reducer,
  connect: connectSlice.reducer,
  session: sessionSlice.reducer,
  userInfo: userInfoSlice.reducer,
  chat: chatSlice.reducer,
  mockSession: mockSessionSlice.reducer,
  settings: settingsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface LoadStateAction extends Action {
  newState: RootState;
}

export const dang_replaceState = (newState: RootState) => {
  // store.dispatch(
  //   setGLoadByKey({
  //     loadKey: KNOWN_LOADS_KEYS.SESSION_STAGE_CHANGE,
  //   }),
  // );

  setTimeout(() => {
    // ! TODO - disconnect!
    newState.errors = {};
    newState.loads = {};

    store.replaceReducer(dang_rootReducer);
    console.log('replaced');
    store.dispatch({ type: 'LOAD_STATE', newState });
    console.log('replace 2');
    store.replaceReducer(rootReducer);
    console.log('replaced 2');

    // store.dispatch(
    //   loadsSlice.actions.removeLoad(KNOWN_LOADS_KEYS.SESSION_STAGE_CHANGE),
    // );
  });
};
