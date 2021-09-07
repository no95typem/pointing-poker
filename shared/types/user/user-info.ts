export interface UserInfo {
  name: string;
  surname: string;
  position: string;
  avatarSrc?: string;
  avatarBg?: string;
}

export interface IUserCardData {
  card: UserInfo;
}
