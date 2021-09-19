import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ISessionStateClient,
  SessionState,
} from '../../../../shared/types/session/state/session-state';

import { SESSION_CLIENT_INIT_STATE } from '../../../../shared/initStates';
import { Synchronized } from '../../../../shared/types/syncable';
import { purify } from '../../../../shared/helpers/processors/purify';
import { CSMsgUpdateState } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-update-state';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/ServerAdapter';
import { CSMsgChatMsg } from '../../../../shared/types/cs-msgs/msgs/spectator/cs-msg-chat-msg';
import { RootState } from '../store';

const initialState = SESSION_CLIENT_INIT_STATE;

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
    dang_updSessStateFromClient(
      state,
      action: PayloadAction<Partial<ISessionStateClient>>,
    ) {
      Object.assign(state, action.payload);
    },
    dang_updSessStateFromServer(
      state,
      action: PayloadAction<Partial<ISessionStateClient>>,
    ) {
      const purified = purify(action.payload);

      const synced = setSynced(purified, true);

      Object.assign(state, synced);
    },
    dang_reset(state) {
      Object.keys(state).forEach(key => {
        delete (state as Record<string, unknown>)[key];
      });
      Object.assign(state, initialState);
    },
    updChatMsgs(state, action) {
      const { command, update } = action.payload.update;
      const msg = {
        [`${update.time} - ${update.clientId}`]: update.text,
      };

      if (command === 'A') {
        Object.assign(state.chat.msgs, msg);
      }
    },
  },
});

export const updSessState = createAsyncThunk(
  'session/updSessState',
  async (update: Partial<SessionState>, thunkAPI) => {
    const synced = setSynced(update, false);
    thunkAPI.dispatch(sessionSlice.actions.dang_updSessStateFromClient(synced));

    const msg = new CSMsgUpdateState(update);

    SERVER_ADAPTER.send(msg);
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (data: [string, number, number], thunkAPI) => {
    const [typedText, clientId, time] = data;
    const state = thunkAPI.getState() as RootState;

    const msg = new CSMsgChatMsg({
      memberId: clientId,
      text: typedText,
      time: time,
      isSynced: true,
    });
    SERVER_ADAPTER.send(msg);

    Object.assign(state.session.chat.msgs, {
      [`${time} - ${clientId}`]: typedText,
    });
  },
);
