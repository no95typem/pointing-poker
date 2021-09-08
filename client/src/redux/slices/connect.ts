import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { genUniqId } from '../../../../shared/helpers/generators/browser-specific';
import { CSMsgCreateSession } from '../../../../shared/types/cs-msgs/cs-create-session';
import { KNOWN_LOADS_KEYS } from '../../knownLoads';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';
import { setLoadByKey } from './loads';

export type WSConnectionStatus = 'connecting' | 'alive' | 'dead';
export type SessionConnectionStatus = 'connecting' | 'connected';

interface ConnectState {
  wsConnectionStatus?: WSConnectionStatus;
  sessionConnectionStatus?: SessionConnectionStatus;
}

const initialState = { wsConnectionStatus: undefined } as ConnectState;

export const connectToLobby = createAsyncThunk(
  'connection/connectToSession',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(args, state);

    return 'test string';
  },
);

export const createSession = createAsyncThunk(
  'connection/createSession',
  async (args, thunkAPI) => {
    const id = genUniqId();
    const msg = new CSMsgCreateSession(id);
    SERVER_ADAPTER.send(msg);
    thunkAPI.dispatch(setLoadByKey(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
  },
);

export const connectSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setWSStatus(state, action: PayloadAction<WSConnectionStatus>) {
      state.wsConnectionStatus = action.payload;
    },
    setConnectionStatus(state, action: PayloadAction<SessionConnectionStatus>) {
      state.sessionConnectionStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(connectToLobby.fulfilled, (state, action) => {
      console.log(state, action);
    });
  },
});

export const { setWSStatus, setConnectionStatus } = connectSlice.actions;
