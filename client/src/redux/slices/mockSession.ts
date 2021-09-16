import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionStage } from '../../../../shared/types/session/state/stages';
import { ISessionName } from '../../../../shared/types/session/state/session-state';

//! Временно создан SESSION_TESTING_STATE, исключительно для отладки.
import { SESSION_TESTING_STATE } from '../../../../shared/initStates';
import { Issue } from '../../../../shared/types/session/issue/issue';

const initialState = SESSION_TESTING_STATE;

export const mockSessionSlice = createSlice({
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
      const editedIssue = state.issues.find(
        issue => issue.id === action.payload.id,
      );

      if (editedIssue) {
        const issueIndex = state.issues.indexOf(editedIssue);

        state.issues[issueIndex] = action.payload;
      } else {
        state.issues.push(action.payload);
      }
    },
    deleteIssue(state, action: PayloadAction<number>) {
      const issue = state.issues.find(issue => issue.id === action.payload);

      if (issue) {
        const issueIndex = state.issues.indexOf(issue);

        state.issues.splice(issueIndex, 1);
      }
    },
  },
});

export const {
  setSessionStatus,
  setSessionId,
  setSessionName,
  addIssue,
  deleteIssue,
} = mockSessionSlice.actions;
