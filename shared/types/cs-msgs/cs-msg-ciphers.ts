import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class CSMsgCiphers {
  readonly CREATE_SESS = 'CREATE_SESS';

  readonly CONN_TO_SESS = 'CONN_TO_SESS';

  readonly DISCONN_FROM_SESS = 'DISCONN_FROM_SESS';

  readonly CHAT_MSG = 'CHAT_MSG';
}

export const CSMSG_CIPHERS = OBJ_PROCESSOR.deepFreeze(new CSMsgCiphers());

export type CSMsgCipher = keyof CSMsgCiphers;
