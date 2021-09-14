import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgVotekickResponse implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.VOTEKICK_RESPONSE;

  constructor(readonly startTime?: number, readonly expirationTime?: number) {}
}
