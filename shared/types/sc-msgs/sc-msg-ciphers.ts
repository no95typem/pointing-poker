import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class SCMsgCiphers {
  readonly SESSION_CREATED = 'SESSION_CREATED';
}

export const SCMSG_CIPHERS = OBJ_PROCESSOR.deepFreeze(new SCMsgCiphers());

export type SCMsgCipher = keyof SCMsgCiphers;
