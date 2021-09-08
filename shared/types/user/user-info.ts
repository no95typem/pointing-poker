export interface UserInfo {
  name: string;
  surname?: string;
  jobPosition?: string;
  avatarBase64?: string;
  avatarBgColor?: string;
}

export interface IUserCardData {
  card: UserInfo;
}
