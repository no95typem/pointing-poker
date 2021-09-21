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
    toggleChatState(state) {
      state.isVisible = !state.isVisible;
    },
    setChatTypedText(state, action) {
      state.typedText = action.payload;
    },
  },
});
