import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgStopRound implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.STOP_ROUND;
}
