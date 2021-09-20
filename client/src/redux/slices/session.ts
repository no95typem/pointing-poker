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
import { ChatMsg } from '../../../../shared/types/session/chat/chat-msg';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import { DEALER_ID } from '../../../../shared/const';
import { CSMsgForceKick } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-force-kick';
import { CSMsgVotekick } from '../../../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { USER_STATES } from '../../../../shared/types/user/user-state';

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

export const sendChatMessage = createAsyncThunk(
  'session/sendChatMessage',
  async (text: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const memberId = state.session.clientId;

    if (memberId === undefined) return false;

    const time = Date.now();
    const chat = OBJ_PROCESSOR.deepClone(state.session.chat);

    const chatMsg: ChatMsg = { memberId, text, time, isSynced: false };

    const msg = new CSMsgChatMsg(chatMsg);
    SERVER_ADAPTER.send(msg);

    chat.msgs[`${time}-${memberId}`] = chatMsg;

    thunkAPI.dispatch(
      sessionSlice.actions.dang_updSessStateFromClient({ chat }),
    );
  },
);

export interface IKickArgs {
  targetId: number;
  decision: boolean;
  initId?: number;
}

export const kick = createAsyncThunk(
  'session/kick',
  async (args: IKickArgs, thunkAPI) => {
    const { targetId, decision, initId } = args;
    const state = thunkAPI.getState() as RootState;

    if (targetId === state.session.clientId || targetId === DEALER_ID) return;

    const isUserDealer = state.session.clientId === DEALER_ID;

    const msg =
      !initId && isUserDealer
        ? new CSMsgForceKick(targetId)
        : new CSMsgVotekick(targetId, decision);

    const members = OBJ_PROCESSOR.deepClone(state.session.members);

    if (decision === true) {
      if (isUserDealer) members[targetId].userState = USER_STATES.KICKED;

      members[targetId].isSynced = false;

      thunkAPI.dispatch(
        sessionSlice.actions.dang_updSessStateFromClient({ members }),
      );
    }

    SERVER_ADAPTER.send(msg);
  },
);
