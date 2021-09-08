import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from '../../../../shared/types/session/member';
import { SessionState } from '../../../../shared/types/session/state/session-state';
import { SessionStage } from '../../../../shared/types/session/state/stages';

const initialState: SessionState<Member> = {
  stage: 'EMPTY',
  members: {},
  chat: {
    isVisible: false,
    msgs: {},
  },
  issues: {},
};

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
