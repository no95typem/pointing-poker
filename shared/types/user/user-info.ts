// ! id -  Уникальный id пользователя, получаемый от сервера.
// ! Нужен как для проверки,принадлежит ли карточка текущему пользователю, так и для голосования по удалению.
// ! + Будет нелишним при генерации карточек, как ключ.

export interface UserInfo {
  id: string;
  name: string;
  surname?: string;
  jobPosition?: string;
  avatarBase64?: string;
  avatarBgColor?: string;
}

export interface IUserCardData {
  card: UserInfo;
  isKickAvailable: boolean;
  isItYou: boolean;
  kickPlayer: (id: string, name: string) => void;
}

export interface IUserCardDataBundle {
  data: IUserCardData;
}
