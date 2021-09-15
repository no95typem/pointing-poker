import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CSMsgConnToSess } from '../../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { KNOWN_LOADS_KEYS } from '../../knownLoads';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';
import { RootState } from '../store';
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
  async (args, thunkAPI) => {
    // TODO (no95typem): get params from the state!
    const state = thunkAPI.getState() as RootState;
    const msg = new CSMsgConnToSess({
      info: state.userInfo,
      role: USER_ROLES.PLAYER,
      sessId: state.homePage.lobbyURL,
    });
    SERVER_ADAPTER.send(msg);
    thunkAPI.dispatch(setLoadByKey(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
  },
);

export const createSession = createAsyncThunk(
  'connection/createSession',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const msg = new CSMsgCreateSession({
      userInfo: state.userInfo,
      settings: state.session.currentGameSettings, // ! TODO (no95typem)
    });
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
