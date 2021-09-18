import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgPick implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.PICK;

  constructor(readonly value: string | undefined) {}
}
