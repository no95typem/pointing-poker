import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class SCMsgCiphers {
  readonly FATAL_ERROR = 'FATAL_ERROR';

  readonly CONN_TO_SESS_STATUS = 'CONN_TO_SESS_STATUS';

  readonly CHAT_MSG = 'CHAT_MSG';
}

export const SCMSG_CIPHERS = OBJ_PROCESSOR.deepFreeze(new SCMsgCiphers());

export type SCMsgCipher = keyof SCMsgCiphers;
