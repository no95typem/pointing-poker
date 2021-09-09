import { CSMsg } from './cs-msg';
import { CSMSG_CIPHERS } from './cs-msg-ciphers';

export class CSMsgCreateSession implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.CREATE_SESSION;

  constructor(readonly reqId: string) {}
}
