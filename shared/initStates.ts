import { Member } from './types/session/member';
import { SessionState } from './types/session/state/session-state';
import { Settings } from './types/settings';

export const SESSION_INIT_STATE: SessionState<Member> = {
  stage: 'EMPTY',
  sessionId: '',
  currentGameSettings: {} as Settings, // ! TODO (no95typem) set default
  name: { value: 'unnamed pp session', isSynced: true },
  members: {},
  chat: {
    isVisible: false,
    msgs: {},
    typedText: '',
  },
  issues: {},
};
