import { Member } from '../../session/member';
import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgNewConnection implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.NEW_CONNECTION;

  constructor(readonly sessionId: string, readonly m: Member) {}
}
