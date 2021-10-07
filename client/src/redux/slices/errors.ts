import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KnownErrorsKey } from '../../../../shared/knownErrorsKeys';

const initialState: Partial<Record<KnownErrorsKey, unknown>> = {};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorByKey(state, action: PayloadAction<KnownErrorsKey>) {
      state[action.payload] = action.payload;
    },
    removeError(state, action: PayloadAction<KnownErrorsKey>) {
      delete state[action.payload];
    },
  },
});

export const { setErrorByKey, removeError } = errorsSlice.actions;
