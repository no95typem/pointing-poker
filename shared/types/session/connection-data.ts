import { UserRole } from '../user/user-role';

export interface ConnectionData {
  userSessionPublicId?: number; // Публичный id
  role: UserRole;
}
