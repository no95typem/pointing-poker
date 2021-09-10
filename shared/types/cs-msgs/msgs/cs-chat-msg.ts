import { CSMsg } from '../cs-msg';
import { CSMSG_CIPHERS } from '../cs-msg-ciphers';

export class CSMsgChatMsg implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.CHAT_MSG;

  constructor(readonly text: string, readonly id: string) {}
}
