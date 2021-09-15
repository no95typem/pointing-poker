import { CardData } from './session/card';

export interface ISettings {
  dealerAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  isTimerNeeded: boolean;
  roundTime: number;
  cards: Record<string, CardData>; // key - id
  cardBackType: ''; // TODO (no95typem)
}

export interface ISettingsComponent {
  name: string;
  label: string;
  value: string | boolean;
}

export interface ISettingsComponentData {
  data: ISettingsComponent;
}
