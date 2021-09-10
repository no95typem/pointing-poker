import { CSMsgCipher } from './cs-msg-ciphers';

export interface CSMsg {
  readonly cipher: CSMsgCipher;
  readonly reqId?: string;
  readonly resId?: string;
}
