import { UNDEFINED_CARD_VALUE } from '../../shared/const';
import { OBJ_PROCESSOR } from '../../shared/helpers/processors/obj-processor';
import { DEFAULT_SETTINGS_SHARED } from '../../shared/initStates';
import { CardData } from '../../shared/types/session/card';
import { ISettings } from '../../shared/types/settings';
import { CARDS_BACKS, CARDS_DECKS } from './presets';

export const AVATAR_WIDTH = 170;
export const AVATAR_HEIGHT = 170;

/* STYLING */
export const MAX_CONTENT_WIDTH = '1400px';
export const MAX_BUTTON_WIDTH = '200px';
export const FIXED_BUTTON_WIDTH = '120px';

/* DATA */
export const UNDEFINED_CARD_DATA: CardData = {
  value: UNDEFINED_CARD_VALUE,
};

export const DEFAULT_SETTINGS_CLIENT: ISettings = {
  ...DEFAULT_SETTINGS_SHARED,
  cards: OBJ_PROCESSOR.deepClone(CARDS_DECKS.FIBONACCI),
  cardbacksBase64: CARDS_BACKS,
  activeCardbackBase64: CARDS_BACKS[2],
};
