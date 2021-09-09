import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { connectSlice } from './slices/connect';
import { errorsSlice } from './slices/errors';
import { loadsSlice } from './slices/loads';
import { localeSlice } from './slices/locale';
import { sessionSlice } from './slices/session';

export const store = configureStore({
  reducer: {
    locale: localeSlice.reducer,
    errors: errorsSlice.reducer,
    loads: loadsSlice.reducer,
    connect: connectSlice.reducer,
    session: sessionSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
