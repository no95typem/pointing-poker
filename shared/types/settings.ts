import { CardData } from './session/card';

export interface ISettings {
  autoAdmit: boolean;
  isDealerPlayer: boolean;
  isPlayerCanReselectCard: boolean;
  isCardShownOnRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cards: CardData[];
  cardBackType: string; // TODO (no95typem)
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
  setLocalSettings: (
    name: string,
    value: string | boolean | CardData[],
  ) => void;
  isGameStage?: boolean;
}
