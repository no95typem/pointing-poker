import { Synchronized } from '../syncable';
import { UserInfo } from '../user/user-info';
import { UserRole } from '../user/user-role';
import { UserState } from '../user/user-state';

export interface Member extends Synchronized {
  userInfo: UserInfo;
  userSessionPublicId: number;
  userRole: UserRole;
  userState: UserState;
}
