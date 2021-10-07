import { OBJ_PROCESSOR } from '../../../helpers/processors/obj-processor';

class RoundStates {
  readonly AWAIT_START = 'AWAIT_START';

  readonly IN_PROCESS = 'IN_PROCESS';

  readonly ENDED = 'ENDED';
}

export const ROUND_STATES = OBJ_PROCESSOR.deepFreeze(new RoundStates());

export type RoundState = keyof RoundStates;
