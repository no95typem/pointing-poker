import { CardData } from './session/card';

export interface ISettings {
  isDealerPlayer: boolean;
  isPlayerCanReselectCard: boolean;
  isCardShownOnRoundEnd: boolean;
  isTimerNeeded: boolean;
  autoAdmit: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cards: CardData[];
  cardBackType: ''; // TODO (no95typem)
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
