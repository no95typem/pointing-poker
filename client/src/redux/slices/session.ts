import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionStage } from '../../../../shared/types/session/state/stages';
import { ISessionName } from '../../../../shared/types/session/state/session-state';

import { SESSION_INIT_STATE } from '../../../../shared/initStates';
import { Issue } from '../../../../shared/types/session/issue/issue';

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
    setSessionName(state, action: PayloadAction<ISessionName>) {
      state.name = action.payload;
    },
    addIssue(state, action: PayloadAction<Issue>) {
      state.issues.push(action.payload);
    },
  },
});

export const { setSessionStatus, setSessionId, setSessionName } =
  sessionSlice.actions;
