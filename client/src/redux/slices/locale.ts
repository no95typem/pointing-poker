import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocaleKey } from '../../locales/locale';
import { LOCALE_US } from '../../locales/locale-us';

const initialState: Record<LocaleKey, string> = LOCALE_US;

export const localeSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Record<LocaleKey, string>>) {
      state = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
