import { UserRole } from '../user/user-role';

export interface ConnectionData {
  userSessionPublicId?: number; // Публичный id
  userSessionPrivateId?: string; // Приватный id
  role: UserRole;
}
