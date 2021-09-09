import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgSessionCreated implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.SESSION_CREATED;

  constructor(readonly sessionId: string) {}
}
