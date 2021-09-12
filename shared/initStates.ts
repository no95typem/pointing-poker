import { Member } from './types/session/member';
import { SessionState } from './types/session/state/session-state';

export const SESSION_INIT_STATE: SessionState<Member> = {
  stage: 'EMPTY',
  members: {},
  chat: {
    isVisible: false,
    msgs: {},
  },
  issues: {},
};
