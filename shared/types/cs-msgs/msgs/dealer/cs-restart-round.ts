import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgRestartRound implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.RESTART_ROUND;
}
