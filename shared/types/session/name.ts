import { Synchronized } from '../syncable';

export interface SessionName extends Synchronized {
  name: string;
}

export interface ISessionNameHandling {
  value: string;
  changeValue: (name: string) => void;
}
