import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionStage } from '../../../../shared/types/session/state/stages';

import { SESSION_INIT_STATE } from '../../../../shared/initStates';

const initialState = SESSION_INIT_STATE;

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
  },
});

export const { setSessionStatus, setSessionId } = sessionSlice.actions;
