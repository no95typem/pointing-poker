import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class CSMsgCiphers {
  readonly CREATE_SESS = 'CREATE_SESS';

  readonly CONN_TO_SESS = 'CONN_TO_SESS';

  readonly DISCONN_FROM_SESS = 'DISCONN_FROM_SESS';

  readonly CHAT_MSG = 'CHAT_MSG';

  readonly VOTEKICK = 'VOTEKICK';

  readonly START_GAME = 'START_GAME';

  readonly START_ROUND = 'START_ROUND';

  readonly RESTART_ROUND = 'RESTART_ROUND';

  readonly STOP_ROUND = 'STOP_ROUND';

  readonly UPDATE_SESSION_STATE = 'UPDATE_SESSION_STATE';

  readonly FORCE_KICK = 'FORCE_KICK';

  readonly PICK = 'PICK';

  readonly NEXT_ISSUE = 'NEXT_ISSUE';

  readonly END_GAME = 'END_GAME';

  readonly NEW_CONNECTION_REPSONSE = 'NEW_CONNECTION_REPSONSE';

  readonly TOGGLE_RESULTS_VISIBILITY = 'TOGGLE_RESULTS_VISIBILITY';
}

export const CSMSG_CIPHERS = OBJ_PROCESSOR.deepFreeze(new CSMsgCiphers());

export type CSMsgCipher = keyof CSMsgCiphers;
