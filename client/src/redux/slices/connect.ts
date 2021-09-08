import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WSConnectionStatus = 'connecting' | 'alive' | 'dead';

interface ConnectState {
  wsConnectionStatus?: WSConnectionStatus;
}

const initialState = { wsConnectionStatus: undefined } as ConnectState;

export const connectToLobby = createAsyncThunk(
  'connect/toLobby',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(args, state);

    return 'test string';
  },
);

export const connectSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setWSStatus(state, action: PayloadAction<WSConnectionStatus>) {
      console.log(state.wsConnectionStatus);
      state.wsConnectionStatus = action.payload;
      console.log(state.wsConnectionStatus);
    },
  },
  extraReducers: builder => {
    builder.addCase(connectToLobby.fulfilled, (state, action) => {
      console.log(state, action);
    });
  },
});

export const { setWSStatus } = connectSlice.actions;
