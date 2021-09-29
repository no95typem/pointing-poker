import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Chat } from '../../../../shared/types/session/chat/chat';
import { RootState } from '../store';
import { notifSlice } from './notifications';

const initialState = {
  isVisible: false,
  typedText: '',
  unreadCount: 0,
} as Chat;

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChatState(state) {
      state.isVisible = !state.isVisible;
    },
    setChatTypedText(state, action) {
      state.typedText = action.payload;
    },
    increaseUnreadCount(state) {
      return {
        ...state,
        unreadCount: state.unreadCount + 1,
      };
    },
    resetUnreadCount(state) {
      return {
        ...state,
        unreadCount: 0,
      };
    },
  },
});

export const tryToToggleChatState = createAsyncThunk(
  'chat/tryToToggleChatState',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    if (!state.chat.isVisible && state.session.clientId === undefined) {
      thunkAPI.dispatch(
        notifSlice.actions.addNotifRec({
          status: 'info',
          text: 'Chat will be available in a session',
          needToShow: true,
        }),
      );
    } else {
      thunkAPI.dispatch(chatSlice.actions.toggleChatState());
      thunkAPI.dispatch(chatSlice.actions.resetUnreadCount());
    }
  },
);
