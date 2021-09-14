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
}

export interface IMemberDataBundle {
  data: IMemberData;
}

export interface IUserCards {
  members: Record<number, Member>;
  findWhoIsUser: (member: Member) => boolean;
  isRoundStarted: boolean;
}

export interface IUserCardsData {
  cardsData: IUserCards;
}

export interface IUserCardsViewBundle extends IUserCardsData {
  modalData: IKickModal;
}

export interface IKickModal {
  isOpen: boolean;
  initiatorName?: string;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
  kickPlayer: (id: number, name: string) => void;
}

export interface IKickModalBundle {
  modalData: IKickModal;
}
