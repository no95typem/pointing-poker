import { Member } from '../../session/member';
import { SessionState } from '../../session/state/session-state';
import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgUpdateSessionStateMsg implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.UPDATE_SESSION_STATE;

  constructor(readonly update: Partial<SessionState<Member>>) {}
}
