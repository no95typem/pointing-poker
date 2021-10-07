import { CardData } from './session/card';

export interface ISettings {
  isAutoAdmit: boolean;
  isDealerPlayer: boolean;
  isPlayerCanReselectCard: boolean;
  isCardShownOnRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cards: CardData[];
  activeCardbackBase64: string;
  cardbacksBase64?: string[];
}

export interface ISettingsComponent {
  name: string;
  label: string;
  value: string | boolean;
  onChange: (name: string, value: string | boolean | CardData[]) => void;
}

export interface ISettingsComponentData {
  data: ISettingsComponent;
}

export interface ISettingsData {
  localSettings: ISettings;
  setLocalSettings: (name: string, value: SettingsValue) => void;
  isGameStage?: boolean;
}

export type SettingsValue = string | boolean | CardData[] | string[] | number;
