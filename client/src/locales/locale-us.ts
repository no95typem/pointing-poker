import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { LocaleKey } from './locale';

const LocaleUS: Record<LocaleKey, string> = {
  SESSION_DEALER_KICK_CONFIRMATION_POPUP_BODY:
    'Do you really want to kick this player?',
};

export const LOCALE_US = OBJ_PROCESSOR.deepFreeze(LocaleUS);
