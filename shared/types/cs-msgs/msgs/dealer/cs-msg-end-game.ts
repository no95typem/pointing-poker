import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgEndGame implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.END_GAME;
}
