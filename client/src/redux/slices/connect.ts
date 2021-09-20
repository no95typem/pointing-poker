import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CSMsgConnToSess } from '../../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { KNOWN_LOADS_KEYS } from '../../../../shared/knownLoadsKeys';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';
import { RootState } from '../store';
import { setGLoadByKey } from './loads';
import { KNOWN_ERRORS_KEYS } from '../../../../shared/knownErrorsKeys';

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
      role: state.homePage.lastUserRole,
      sessId: state.homePage.lobbyURL,
    });
    SERVER_ADAPTER.send(msg);
    thunkAPI.dispatch(
      setGLoadByKey({
        loadKey: KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER,
        errorKey: KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER,
      }),
    );
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
    thunkAPI.dispatch(
      setGLoadByKey({
        loadKey: KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER,
        errorKey: KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER,
      }),
    );
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
