import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { LocaleKey } from './locale';

const LocaleUS: Record<LocaleKey, string> = {
  SESSION_DEALER_KICK_CONFIRMATION_POPUP_BODY:
    'Do you really want to kick this player?',

  APP_SERVER_CONNECTION_STATUS_TOAST_TITLE: 'Connection info',

  APP_SERVER_CONNECTION_STATUS_TOAST_DESC: 'Succesfully connected to a server',
};

export const LOCALE_US = OBJ_PROCESSOR.deepFreeze(LocaleUS);
