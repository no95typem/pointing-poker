import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Chat } from '../../../../shared/types/session/chat/chat';
import { RootState } from '../store';
import { addNotifRec } from './notifications';

const initialState = {
  isVisible: false,
  typedText: '',
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
  },
});

export const tryToToggleChatState = createAsyncThunk(
  'chat/tryToToggleChatState',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    if (!state.chat.isVisible && state.session.clientId === undefined) {
      thunkAPI.dispatch(
        addNotifRec({
          status: 'info',
          text: 'Chat will be available in a session',
          needToShow: true,
        }),
      );
    } else thunkAPI.dispatch(chatSlice.actions.toggleChatState());
  },
);
