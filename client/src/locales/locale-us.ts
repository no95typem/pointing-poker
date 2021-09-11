import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { LocaleKey } from './locale';

const LocaleUS: Record<LocaleKey, string> = {
  SESSION_DEALER_KICK_CONFIRMATION_POPUP_BODY:
    'Do you really want to kick this player?',

  APP_SERVER_CONNECTION_STATUS_TOAST_TITLE: 'Connection info',

  APP_SERVER_CONNECTION_STATUS_TOAST_DESC: 'Succesfully connected to a server',

  KICK_PLAYER_MODAL_TEXT_START: 'Do you really want to remove player',

  KICK_PLAYER_MODAL_TEXT_FINISH: 'from game session?',

  SETTINGS_IS_DEALER_PLAYER: 'Scram dealer as player:',

  SETTINGS_OPEN_CARDS_ON_ROUND_END: 'Open cards on round end:',

  SETTINGS_IS_TIMER_ON: 'Is timer enabled:',

  SETTINGS_SCORE_TYPE: 'Score type:',

  SETTINGS_SCORE_TYPE_SHORT: 'Score type (Short):',
};

export const LOCALE_US = OBJ_PROCESSOR.deepFreeze(LocaleUS);
