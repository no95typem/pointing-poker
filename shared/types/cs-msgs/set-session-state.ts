import { SessionStage } from '../session/state/stages';
import { CSMsg } from './cs-msg';
import { CSMSG_CIPHERS } from './cs-msg-ciphers';

export class CSMsgSetSessionState implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.SET_SESSION_STATE;

  constructor(readonly state: SessionStage) {}
}
