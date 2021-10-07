import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class UserStates {
  readonly CONNECTED = 'CONNECTED';

  readonly DISCONNECTED = 'DISCONNECTED';

  readonly KICKED = 'KICKED';
}

export const USER_STATES = OBJ_PROCESSOR.deepFreeze(new UserStates());

export type UserState = keyof UserStates;
