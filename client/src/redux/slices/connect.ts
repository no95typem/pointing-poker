import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CSMsgConnToSess } from '../../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { KNOWN_LOADS_KEYS } from '../../../../shared/knownLoadsKeys';
import { RootState } from '../store';
import { setGLoadByKey } from './loads';
import { KNOWN_ERRORS_KEYS } from '../../../../shared/knownErrorsKeys';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';

export type WSConnectionStatus = 'connecting' | 'connected' | 'failed';
export type SessionConnectionStatus = 'connecting' | 'connected';

interface ConnectState {
  serverConnectionStatus?: WSConnectionStatus;
  sessionConnectionStatus?: SessionConnectionStatus;
}

const initialState = { serverConnectionStatus: undefined } as ConnectState;

export const connectToLobby = createAsyncThunk(
  'connect/connectToSession',
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
  'connect/createSession',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const msg = new CSMsgCreateSession({
      userInfo: state.userInfo,
      settings: state.session.gSettings,
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
