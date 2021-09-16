import { CardData } from './session/card';

export interface Settings {
  dealerAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  isTimerNeeded: boolean;
  roundTime?: number;
  cards: CardData[];
  cardBackType: ''; // TODO (no95typem)
}

export interface ISettingsComponent {
  name: string;
  label: string;
}

export interface ISettingsComponentData {
  data: ISettingsComponent;
}
