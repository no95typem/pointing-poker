import { createSlice } from '@reduxjs/toolkit';
import { ChatVisible } from '../../../../shared/types/session/chat/chat-visible';

const initialState = {
  isVisible: false,
} as ChatVisible;

export const chatVisibleSlice = createSlice({
  name: 'ChatVisible',
  initialState,
  reducers: {
    chatStateToggle(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { chatStateToggle } = chatVisibleSlice.actions;
