export interface UserInfo {
  name: string;
  surname?: string;
  jobPosition?: string;
  avatarBase64?: string;
  AvatarBgColor?: string;
}

export interface IUserCardData {
  card: UserInfo;
}
