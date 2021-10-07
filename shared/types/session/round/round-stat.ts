export interface IPercentageRec {
  count: number;
  ids: number[];
}

export type Percentage = Record<string, IPercentageRec>; // key - value of card, number - percentage

export interface RoundStat {
  votes: Record<number, string | undefined>;
  pct: Percentage;
}
