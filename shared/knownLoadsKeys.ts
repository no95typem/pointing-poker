import { OBJ_PROCESSOR } from './helpers/processors/obj-processor';

class knownLoadsKeys {
  readonly UNEXPECTED_REDIRECT_TO_LOAD = 'UNEXPECTED_REDIRECT_TO_LOAD';

  readonly CONNECTING_TO_SERVER = 'CONNECTING_TO_SERVER';

  readonly SESSION_STAGE_CHANGE = 'SESSION_STAGE_CHANGE';

  readonly CONNECTING_TO_LOBBY = 'CONNECTING_TO_LOBBY';

  readonly AWAITING_ADMISSION = 'AWAITING_ADMISSION';
}

export const KNOWN_LOADS_KEYS = OBJ_PROCESSOR.deepFreeze(new knownLoadsKeys());

export type KnownLoadKey = keyof knownLoadsKeys;
