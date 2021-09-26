import { OBJ_PROCESSOR } from './helpers/processors/obj-processor';

class knownErrorsKeys {
  readonly NO_CONNECTION_TO_SERVER = 'NO_CONNECTION_TO_SERVER';

  readonly FAILED_TO_SEND_MSG_TO_SERVER = 'FAILED_TO_SEND_MSG_TO_SERVER';

  readonly UNEXPECTED_REDIRECT_TO_ERROR = 'UNEXPECTED_REDIRECT_TO_ERROR';

  readonly SC_PROTOCOL_ERROR = 'SC_PROTOCOL_ERROR';

  readonly SC_ALREADY_CONNECTED_TO_SESSION = 'SC_ALREADY_CONNECTED_TO_SESSION';

  readonly SESSION_DOES_NOT_EXIST = 'SESSION_DOES_NOT_EXIST';

  readonly UNKNOWN_ERROR = 'UNKNOWN_ERROR';

  readonly YOU_WERE_KICKED = 'YOU_WERE_KICKED';
}

export const KNOWN_ERRORS_KEYS = OBJ_PROCESSOR.deepFreeze(
  new knownErrorsKeys(),
);

export type KnownErrorsKey = keyof knownErrorsKeys;
