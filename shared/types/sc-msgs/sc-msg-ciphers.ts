import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class SCMsgCiphers {
  readonly CHAT_MSG = 'CHAT_MSG';

  readonly CONN_TO_SESS_STATUS = 'CONN_TO_SESS_STATUS';

  readonly MEMBERS_CHANGED = 'MEMBERS_CHANGED';

  readonly UPDATE_SESSION_STATE = 'UPDATE_SESSION_STATE';

  readonly VOTEKICK = 'VOTEKICK';

  readonly VOTEKICK_RESPONSE = 'VOTEKICK_RESPONSE';

  readonly VOTEKICK_RESULT = 'VOTEKICK_RESULT';

  readonly FORCE_KICK = 'FORCE_KICK';

  readonly YOU_WERE_KICKED = 'YOU_WERE_KICKED';

  readonly NEW_CONNECTION = 'NEW_CONNECTION';
}

export const SCMSG_CIPHERS = OBJ_PROCESSOR.deepFreeze(new SCMsgCiphers());

export type SCMsgCipher = keyof SCMsgCiphers;
