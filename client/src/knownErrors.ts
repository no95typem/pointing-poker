import { OBJ_PROCESSOR } from '../../shared/helpers/processors/obj-processor';
import { KnownErrorsKey } from '../../shared/knownErrorsKeys';
import { NoConnectionToServerPage } from './containers/ErrorsMUX/ErrorsPages/NoConnectionToServerPage/NoConnectionToServerPage';

export interface AppError {
  type: 'unknown' | 'communication';
  description: string;
  more?: string;
  Component?: () => JSX.Element;
}

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
  SC_PROTOCOL_ERROR: {
    type: 'communication',
    description: 'Generic protocol error',
  },
  SC_ALREADY_CONNECTED_TO_SESSION: {
    type: 'communication',
    description: 'You already connected to a session',
  },
  SESSION_DOES_NOT_EXIST: {
    type: 'communication',
    description: `Session doesn't exist`,
  },
  YOU_WERE_KICKED: {
    type: 'communication',
    description: `You were kicked!`,
  },
  UNKNOWN_ERROR: {
    type: 'unknown',
    description: `Unknown error, try to reload the page`,
  },
};

OBJ_PROCESSOR.deepFreeze(KNOWN_ERRORS);
