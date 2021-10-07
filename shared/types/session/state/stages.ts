import { OBJ_PROCESSOR } from '../../../helpers/processors/obj-processor';

class SessionStages {
  readonly LOBBY = 'LOBBY';

  readonly EMPTY = 'EMPTY';

  readonly GAME = 'GAME';

  readonly STATS = 'STATS';
}

export const SESSION_STAGES = OBJ_PROCESSOR.deepFreeze(new SessionStages());

export type SessionStage = keyof SessionStages;
