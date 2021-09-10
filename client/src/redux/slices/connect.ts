import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CSMsgConnToSess } from '../../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { Settings } from '../../../../shared/types/settings';
import { UserInfo } from '../../../../shared/types/user/user-info';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { KNOWN_LOADS_KEYS } from '../../knownLoads';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';
import { setLoadByKey } from './loads';

export type WSConnectionStatus = 'connecting' | 'connected' | 'failed';
export type SessionConnectionStatus = 'connecting' | 'connected';

interface ConnectState {
  serverConnectionStatus?: WSConnectionStatus;
  sessionConnectionStatus?: SessionConnectionStatus;
}

const initialState = { serverConnectionStatus: undefined } as ConnectState;

export const connectToLobby = createAsyncThunk(
  'connection/connectToSession',
  async (id: string, thunkAPI) => {
    // TODO (no95typem): get params from the state!
    const msg = new CSMsgConnToSess({
      info: {} as UserInfo,
      role: USER_ROLES.PLAYER,
      sessId: id,
    });
    SERVER_ADAPTER.send(msg);
    thunkAPI.dispatch(setLoadByKey(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
  },
);

export const createSession = createAsyncThunk(
  'connection/createSession',
  async (args, thunkAPI) => {
    const msg = new CSMsgCreateSession({} as UserInfo, {} as Settings);
    SERVER_ADAPTER.send(msg);
    thunkAPI.dispatch(setLoadByKey(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
  },
);

export const connectSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setServerConnectionStatus(
      state,
      action: PayloadAction<WSConnectionStatus>,
    ) {
      state.serverConnectionStatus = action.payload;
    },
    setSessionConnectionStatus(
      state,
      action: PayloadAction<SessionConnectionStatus>,
    ) {
      state.sessionConnectionStatus = action.payload;
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(connectToLobby.fulfilled, (state, action) => {
  //     console.log(state, action);
  //   });
  // },
});

export const { setServerConnectionStatus, setSessionConnectionStatus } =
  connectSlice.actions;
