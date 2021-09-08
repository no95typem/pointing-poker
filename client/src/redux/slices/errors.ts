import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppError {
  type: 'unknown' | 'communication';
  reason: string;
  more: string;
}

interface ErrorsState {
  errors: Record<string, AppError>;
}

const initialState = { errors: {} } as ErrorsState;

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<AppError>) {
      state.errors[action.payload.reason] = action.payload;
    },
  },
});

export const { setError } = errorsSlice.actions;
