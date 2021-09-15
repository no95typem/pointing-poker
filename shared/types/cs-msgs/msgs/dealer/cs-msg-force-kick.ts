import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgForceKick implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.FORCE_KICK;

  constructor(readonly targetId: number) {}
}
