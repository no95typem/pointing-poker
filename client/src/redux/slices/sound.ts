import { createSlice } from '@reduxjs/toolkit';
import { Sound } from '../../../../shared/types/sound';

const initialState = {
  isMute: false,
} as Sound;

export const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    tryToToggleSound(state) {
      state.isMute = !state.isMute;
    },
  },
});

export const { tryToToggleSound } = soundSlice.actions;
