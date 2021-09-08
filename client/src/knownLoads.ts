import { OBJ_PROCESSOR } from '../../shared/helpers/processors/obj-processor';

export interface AppLoad {
  type: 'unknown' | 'communication';
  description: string;
  more?: string;
  Component?: () => JSX.Element;
}

class knownLoadsKeys {
  readonly UNEXPECTED_REDIRECT_TO_LOAD = 'UNEXPECTED_REDIRECT_TO_LOAD';

  readonly CONNECTING_TO_SERVER = 'CONNECTING_TO_SERVER';
}

export const KNOWN_LOADS_KEYS = OBJ_PROCESSOR.deepFreeze(new knownLoadsKeys());

export type KnownLoadKey = keyof knownLoadsKeys;

export const KNOWN_LOADS: Record<KnownLoadKey, AppLoad> = {
  UNEXPECTED_REDIRECT_TO_LOAD: {
    type: 'unknown',
    description: `You was redirected to this page, but no known loads are found. It's strange, Please, wait...`,
  },
  CONNECTING_TO_SERVER: {
    type: 'communication',
    description: `Please wait until a connection with a server will be established`,
  },
};

OBJ_PROCESSOR.deepFreeze(KNOWN_LOADS);
