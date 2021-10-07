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

  SETTINGS_IS_CARD_SHOWN_ON_ROUND_END: 'Show cards on round end:',

  SETTINGS_IS_PLAYER_CAN_RESELECT_CARD:
    'Can player reselect card during round:',

  SETTINGS_IS_AUTO_ADMIT: `Auto admit new connections:`,

  SETTINGS_IS_TIMER_ON: 'Is timer enabled:',

  SETTINGS_SCORE_TYPE: 'Score type:',

  SETTINGS_SCORE_TYPE_SHORT: 'Score type (Short):',

  SETTINGS_CARDS_HEADER: 'Adjust cards values:',

  SETTINGS_CARDS_MODAL_CUSTOM:
    "If it's custom value, add image to illustrate it:",
};

export const LOCALE_US = OBJ_PROCESSOR.deepFreeze(LocaleUS);
