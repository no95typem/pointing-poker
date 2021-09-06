import { Settings } from '../settings';
import { CSMsg } from './cs-msg';
import { CSMSG_CIPHERS } from './cs-msg-ciphers';

export class CSMsgSetSettings implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.SET_SETTINGS;

  constructor(readonly settings: Settings) {}
}
