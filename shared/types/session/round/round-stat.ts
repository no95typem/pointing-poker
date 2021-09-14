export interface RoundStat {
  votes: Record<number, string | undefined>;
  percentage: Record<string, number>; // key - value of card, number - percentage
}
