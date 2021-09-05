import { OBJ_PROCESSOR } from '../../../client/lib/processors/obj-processor';

class UserRoles {
  readonly DEALER = 'DEALER';

  readonly PLAYER = 'PLAYER';

  readonly SPECTACLE = 'SPECTACLE';
}

export const CSMSG_CIPHERS = OBJ_PROCESSOR.deepFreeze(new UserRoles());

export type UserRole = keyof UserRoles;
