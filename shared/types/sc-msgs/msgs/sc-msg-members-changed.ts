import { Member } from '../../session/member';
import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgMembersChanged implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.MEMBERS_CHANGED;

  constructor(
    readonly sessionId: string,
    readonly update: Record<number, Partial<Member>>,
  ) {}
}
