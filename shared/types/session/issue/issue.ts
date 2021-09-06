import { IssuePriority } from './issue-priority';
import { RoundStat } from '../round/round-stat';
import { Synchronized } from '../../syncable';

// ? Make it class?

export interface Issue extends Synchronized {
  id: string;
  title: string;
  link: string;
  priority: IssuePriority;
  pos: number;
  closed: boolean;
  stat?: RoundStat;
}
