import { Synchronized } from '../syncable';
import { ISessionName } from './state/session-state';

export interface SessionName extends Synchronized {
  name: string;
}

export interface ISessionNameHandling {
  name: ISessionName;
  changeValue: (name: string) => void;
  isPlayerDealer: boolean;
}
