import { OBJ_PROCESSOR } from '../../helpers/processors/obj-processor';

class UserRoles {
  readonly DEALER = 'DEALER';

  readonly PLAYER = 'PLAYER';

  readonly SPECTACLE = 'SPECTACLE';
}

export const USER_ROLES = OBJ_PROCESSOR.deepFreeze(new UserRoles());

export type UserRole = keyof UserRoles;
