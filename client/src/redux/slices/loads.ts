import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KnownLoadKey } from '../../knownLoads';

const initialState: Partial<Record<KnownLoadKey, unknown>> = {};

export const loadsSlice = createSlice({
  name: 'loads',
  initialState,
  reducers: {
    setLoadByKey(state, action: PayloadAction<KnownLoadKey>) {
      console.log(`add load ${action.payload}`);
      state[action.payload] = action.payload;
    },
    removeLoad(state, action: PayloadAction<KnownLoadKey>) {
      delete state[action.payload];
      console.log(`remove load ${action.payload}`);
    },
  },
});

export const { setLoadByKey, removeLoad } = loadsSlice.actions;
