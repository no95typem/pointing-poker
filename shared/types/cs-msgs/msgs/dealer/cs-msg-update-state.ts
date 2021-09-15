import { SessionState } from '../../../session/state/session-state';
import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgUpdateState implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.UPDATE_SESSION_STATE;

  constructor(readonly update: Partial<SessionState>) {}
}
