import { Member } from '../session/member';
import { CSMsg } from './cs-msg';
import { CSMSG_CIPHERS } from './cs-msg-ciphers';

export class CSMsgSetDealer implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.SET_DEALER;

  constructor(readonly member: Member) {}
}
