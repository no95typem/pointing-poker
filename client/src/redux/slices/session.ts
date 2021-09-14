import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionStage } from '../../../../shared/types/session/state/stages';
import { ISessionName } from '../../../../shared/types/session/state/session-state';

//! Временно создан SESSION_TESTING_STATE, исключительно для отладки.
import {
  // SESSION_INIT_STATE,
  SESSION_TESTING_STATE,
} from '../../../../shared/initStates';

// const initialState = SESSION_INIT_STATE;

const initialState = SESSION_TESTING_STATE;

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionStatus(state, action: PayloadAction<SessionStage>) {
      state.stage = action.payload;
    },
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
    },
    setSessionName(state, action: PayloadAction<ISessionName>) {
      state.name = action.payload;
    },
  },
});

export const { setSessionStatus, setSessionId, setSessionName } =
  sessionSlice.actions;
