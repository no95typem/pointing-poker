import { Synchronized } from '../syncable';

export interface SessionName extends Synchronized {
  name: string;
}
