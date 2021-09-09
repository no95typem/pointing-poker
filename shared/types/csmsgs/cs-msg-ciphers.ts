import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class CSMsgCiphers {
  readonly SET_DEALER = 'SET_DEALER';

  readonly SET_ISSUES = 'SET_ISSUES';

  readonly SET_SETTINGS = 'SET_SETTINGS';

  readonly SET_SESSION_STATE = 'SET_SESSION_STATE';

  readonly VOTEKICK = 'VOTEKICK';

  readonly UPDATE_MEMBERS = 'UPDATE_MEMBERS';

  readonly USER_INFO = 'USER_INFO';
}

export const CSMSG_CIPHERS = OBJ_PROCESSOR.deepFreeze(new CSMsgCiphers());

export type CSMsgCipher = keyof CSMsgCiphers;
