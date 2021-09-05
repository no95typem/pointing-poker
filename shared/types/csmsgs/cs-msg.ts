import { CSMsgCipher } from './cs-msg-ciphers';

export interface CSMsg {
  readonly cipher: CSMsgCipher;
  readonly msgId?: string;
}
