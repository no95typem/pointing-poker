import { configureStore } from '@reduxjs/toolkit';
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

export const store = configureStore({
  reducer: {
    homePage: homePageSlice.reducer,
    locale: localeSlice.reducer,
    errors: errorsSlice.reducer,
    loads: loadsSlice.reducer,
    connect: connectSlice.reducer,
    session: sessionSlice.reducer,
    userInfo: userInfoSlice.reducer,
    mockSession: mockSessionSlice.reducer,
    settings: settingsSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
