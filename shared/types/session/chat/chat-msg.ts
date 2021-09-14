import { Synchronized } from '../../syncable';

export interface ChatMsg extends Synchronized {
  readonly text: string;
  readonly time: number; // Date.now()
  readonly memberId: number;
  readonly rejected?: true;
}

// key for ChatMsgs {} - `${memberId}-${time}`
