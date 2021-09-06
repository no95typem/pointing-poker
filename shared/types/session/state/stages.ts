import { OBJ_PROCESSOR } from '../../../../client/lib/processors/obj-processor';

class SessionStages {
  readonly LOBBY = 'LOBBY';

  readonly GAME = 'GAME';

  readonly STATS = 'STATS';
}

export const SESSION_STAGES = OBJ_PROCESSOR.deepFreeze(new SessionStages());

export type SessionStage = keyof SessionStages;
