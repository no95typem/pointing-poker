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

export interface IMemberData {
  member: Member;
  isItYou: boolean;
  isRoundStarted: boolean;
  kickPlayer?: (id: number, name: string) => void;
  isPlayerSpectator?: boolean;
}

export interface IUserCards {
  members: Record<number, Member>;
  isItYou: (member: Member) => boolean;
  isGameStage: boolean;
  isVotersView?: boolean;
  isDealerPlaying: boolean;
  isPlayerSpectator: boolean;
}
