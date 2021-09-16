import { ISettings } from './../../../../shared/types/settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultSettings } from '../../../../shared/initStates';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultSettings,
  reducers: {
    setSettings(state, action: PayloadAction<ISettings>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSettings } = settingsSlice.actions;
