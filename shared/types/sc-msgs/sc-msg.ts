import { SCMsgCipher } from './sc-msg-ciphers';

export interface SCMsg {
  readonly cipher: SCMsgCipher;
  readonly reqId?: string;
  readonly resId?: string;
}
