import { Member } from '../session/member';
import { CSMsg } from './cs-msg';
import { CSMSG_CIPHERS } from './cs-msg-ciphers';
import { CSMsgUpdateMembersAction } from './update-members-actions';

export class CSMsgUpdateMembers implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.UPDATE_MEMBERS;

  constructor(
    readonly action: CSMsgUpdateMembersAction,
    readonly members: Member[],
  ) {}
}
