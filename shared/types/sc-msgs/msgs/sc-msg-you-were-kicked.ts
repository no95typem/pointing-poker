import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgYouWereKicked implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.YOU_WERE_KICKED;

  constructor(readonly sessionId: string) {}
}
