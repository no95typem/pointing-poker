import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ISessionStateClient,
  SessionState,
} from '../../../../shared/types/session/state/session-state';

//! Временно создан SESSION_TESTING_STATE, исключительно для отладки.
import {
  SESSION_CLIENT_INIT_STATE,
  // SESSION_TESTING_STATE,
} from '../../../../shared/initStates';
import { Synchronized } from '../../../../shared/types/syncable';
import { purify } from '../../../../shared/helpers/processors/purify';
import { CSMsgUpdateState } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-update-state';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';
import { CSMsgChatMsg } from '../../../../shared/types/cs-msgs/msgs/cs-chat-msg';

const initialState = SESSION_CLIENT_INIT_STATE;

// const initialState = SESSION_TESTING_STATE;

const setSynced = <T>(thing: T, synced: boolean): T => {
  if (typeof thing === 'object' && thing !== null) {
    Object.entries(thing).forEach(entry => {
      (thing as Record<string, unknown>)[entry[0]] = setSynced(
        entry[1],
        synced,
      );
    });

    if ('isSynced' in thing)
      (thing as unknown as Synchronized).isSynced = synced;
  }

  return thing;
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    internal_updSessStateFromClient(
      state,
      action: PayloadAction<Partial<ISessionStateClient>>,
    ) {
      Object.assign(state, action.payload);
    },
    server_updSessState(
      state,
      action: PayloadAction<Partial<ISessionStateClient>>,
    ) {
      const purified = purify(action.payload);
      const synced = setSynced(purified, true);
      Object.assign(state, synced);
    },
  },
});

export const updSessState = createAsyncThunk(
  'session/updSessState',
  async (update: Partial<SessionState>, thunkAPI) => {
    const synced = setSynced(update, false);
    thunkAPI.dispatch(
      sessionSlice.actions.internal_updSessStateFromClient(synced),
    );

    const msg = new CSMsgUpdateState(update);
    SERVER_ADAPTER.send(msg);
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (typedText: string, thunkAPI) => {
    const msg = new CSMsgChatMsg({
      text: typedText,
      time: Date.now(),
      memberId: 1, //!!!
      isSynced: true,
    });
    SERVER_ADAPTER.send(msg);
  },
);

export const { server_updSessState } = sessionSlice.actions;
