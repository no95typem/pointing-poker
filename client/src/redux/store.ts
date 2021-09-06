import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import test from './slices/test';

export const store = configureStore({
  reducer: {
    counter: test,
  },
  devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
