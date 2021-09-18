import { createSlice } from '@reduxjs/toolkit';
import { Chat } from '../../../../shared/types/session/chat/chat';

const initialState = {
  isVisible: false,
  typedText: '',
} as Chat;

export const chatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    chatStateToggle(state) {
      state.isVisible = !state.isVisible;
    },
    changeText(state, action) {
      state.typedText = action.payload;
    },
    clearText(state) {
      state.typedText = '';
    },
  },
});

export const { chatStateToggle, changeText, clearText } = chatSlice.actions;
