import { IssuePriority } from './issue-priority';
import { RoundStat } from '../round/round-stat';
import { Synchronized } from '../../syncable';

// ? Make it class?

export interface Issue extends Synchronized {
  id: number;
  title: string;
  link: string;
  priority: IssuePriority;
  closed: boolean;
  stat?: RoundStat;
}
