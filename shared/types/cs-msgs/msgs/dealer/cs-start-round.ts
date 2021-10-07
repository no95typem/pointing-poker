import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgStartRound implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.START_ROUND;
}
