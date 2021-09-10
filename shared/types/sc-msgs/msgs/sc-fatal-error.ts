import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgFatalError implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.FATAL_ERROR;

  constructor(readonly reason: string) {}
}
