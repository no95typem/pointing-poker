import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';

class LocaleKeys {
  readonly SESSION_DEALER_KICK_CONFIRMATION_POPUP_BODY =
    'SESSION_DEALER_KICK_CONFIRMATION_POPUP_BODY';
}

export const LOCALE_KEYS = OBJ_PROCESSOR.deepFreeze(new LocaleKeys());

export type LocaleKey = keyof LocaleKeys;
