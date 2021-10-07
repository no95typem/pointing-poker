import { KnownLoadKey } from '../../knownLoadsKeys';
import { CSMsgCipher } from './cs-msg-ciphers';

export interface CSMsg {
  readonly cipher: CSMsgCipher;
  readonly loadKey?: KnownLoadKey;
}
