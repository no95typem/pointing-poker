import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgDisconFromSess implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.DISCONN_FROM_SESS;
}
