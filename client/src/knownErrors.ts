import { OBJ_PROCESSOR } from '../../shared/helpers/processors/obj-processor';
import { NoConnectionToServerPage } from './containers/ErrorsMUX/ErrorsPages/NoConnectionToServerPage/NoConnectionToServerPage';

export interface AppError {
  type: 'unknown' | 'communication';
  description: string;
  more?: string;
  Component?: () => JSX.Element;
}

class knownErrorsKeys {
  readonly NO_CONNECTION_TO_SERVER = 'NO_CONNECTION_TO_SERVER';

  readonly FAILED_TO_SEND_MSG_TO_SERVER = 'FAILED_TO_SEND_MSG_TO_SERVER';

  readonly UNEXPECTED_REDIRECT_TO_ERROR = 'UNEXPECTED_REDIRECT_TO_ERROR';
}

export const KNOWN_ERRORS_KEYS = OBJ_PROCESSOR.deepFreeze(
  new knownErrorsKeys(),
);

export type KnownErrorsKey = keyof knownErrorsKeys;

export const KNOWN_ERRORS: Record<KnownErrorsKey, AppError> = {
  NO_CONNECTION_TO_SERVER: {
    type: 'communication',
    description: `Can't connect to a server. Our server is down or something breaks a connection`,
    Component: NoConnectionToServerPage,
  },
  UNEXPECTED_REDIRECT_TO_ERROR: {
    type: 'unknown',
    description: `You was redirected to this page, but no known errors are found. It's strange, Try to reload page.`,
  },
  FAILED_TO_SEND_MSG_TO_SERVER: {
    type: 'communication',
    description: 'failed to send msg through ws',
  },
};

OBJ_PROCESSOR.deepFreeze(KNOWN_ERRORS);
