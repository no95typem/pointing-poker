import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgForceKick implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.FORCE_KICK;

  constructor(readonly sessionId: string, readonly targetId: number) {}
}
