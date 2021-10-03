import { ISettings } from './../../../../shared/types/settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_SETTINGS_CLIENT } from '../../constants';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: DEFAULT_SETTINGS_CLIENT,
  reducers: {
    setSettings(state, action: PayloadAction<ISettings>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSettings } = settingsSlice.actions;
