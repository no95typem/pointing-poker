export type Percentage = Record<
  string,
  {
    count: number;
    membersIds: number[];
  }
>; // key - value of card, number - percentage

export interface RoundStat {
  votes: Record<number, string | undefined>;
  percentage: Percentage;
}
