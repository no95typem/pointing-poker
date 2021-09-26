import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMSGNewConnectionResponse implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.NEW_CONNECTION_REPSONSE;

  constructor(readonly id: number, readonly allow: boolean) {}
}
