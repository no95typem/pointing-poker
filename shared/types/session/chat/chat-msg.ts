import { Synchronized } from '../../syncable';

// key for ChatMsgs {} - `${time}-${memberId}`

export interface ChatMsg extends Synchronized {
  readonly memberId: number;
  readonly text: string;
  readonly time: number; // Date.now() will be overwritten by server!
  readonly clientTime?: number; // server sends clientTime to sender
  isViewed?: boolean;
}
