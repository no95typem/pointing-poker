import { Card } from './session/card';

export interface Settings {
  dealerAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  isTimerNeeded: boolean;
  roundTime?: number;
  cards: Record<string, Card>; // key - id
  cardBackType: ''; // TODO (no95typem)
}
