export interface IButton {
  text: string;
  width: string;
  isLoading?: boolean;
  isCofirmButton?: boolean;
  loadingText?: string;
  onClick?: () => void;
}

export interface IButtonData {
  data: IButton;
}
