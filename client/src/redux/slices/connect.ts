import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WSConnectionStatus = 'connecting' | 'connected' | 'failed';
export type SessionConnectionStatus = 'connecting' | 'connected';

interface ConnectState {
  serverConnectionStatus?: WSConnectionStatus;
  sessionConnectionStatus?: SessionConnectionStatus;
}

const initialState = { serverConnectionStatus: undefined } as ConnectState;

export const connectSlice = createSlice({
  name: 'connect',
  initialState,
  reducers: {
    setServerConnectionStatus(
      state,
      action: PayloadAction<WSConnectionStatus>,
    ) {
      state.serverConnectionStatus = action.payload;
    },
  },
});
