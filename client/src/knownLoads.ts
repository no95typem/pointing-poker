import { OBJ_PROCESSOR } from '../../shared/helpers/processors/obj-processor';
import { KnownLoadKey } from '../../shared/knownLoadsKeys';
import { AdmitAwaitPage } from './containers/LoadsMUX/LoadsPages/AdmitAwaitPage/AdmitAwaitPage';

export interface AppLoad {
  type: 'unknown' | 'communication';
  description: string;
  more?: string;
  Component?: React.ReactNode;
}

export const KNOWN_LOADS: Record<KnownLoadKey, AppLoad> = {
  UNEXPECTED_REDIRECT_TO_LOAD: {
    type: 'unknown',
    description: `You was redirected to this page, but no known loads are found. It's strange, Please, wait...`,
  },
  CONNECTING_TO_SERVER: {
    type: 'communication',
    description: `Please wait until a connection with a server will be established`,
  },
  SESSION_STAGE_CHANGE: {
    type: 'communication',
    description: `Session stage is changing. please wait...`,
  },
  CONNECTING_TO_LOBBY: {
    type: 'communication',
    description: `Connecting to lobby...`,
  },
  AWAITING_ADMISSION: {
    type: 'communication',
    description: 'Awaiting admission',
    Component: AdmitAwaitPage,
  },
};

OBJ_PROCESSOR.deepFreeze(KNOWN_LOADS);
