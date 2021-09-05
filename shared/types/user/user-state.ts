import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class UserStates {
  readonly CONECTED = 'CONECTED';

  readonly DISCONNECTED = 'DISCONNECTED';

  readonly KICKED = 'KICKED';
}

export const USER_STATES = OBJ_PROCESSOR.deepFreeze(new UserStates());

export type UserState = keyof UserStates;
