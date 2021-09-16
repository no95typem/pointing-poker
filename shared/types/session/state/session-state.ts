import { Settings } from '../../settings';
import { Synchronized } from '../../syncable';
import { ChatMsg } from '../chat/chat-msg';
import { Issue } from '../issue/issue';
import { Member } from '../member';
import { RoundState } from '../round/round-state';
import { SessionStage } from './stages';

export interface ISessionName extends Synchronized {
  value: string;
}

export interface ISessionGameState {
  roundState: RoundState;
  roundStartTime?: number;
  currIssueId: number;
  // key number - userPublicId, val number - value of card
  votes: Record<number, string | undefined>;
}

export interface SessionState {
  sessionId: string;

  members: Record<number, Member>; // key - publicId od member

  name: ISessionName;

  stage: SessionStage;

  chat: {
    isVisible: boolean;
    msgs: Record<number, ChatMsg>;
    typedText: string;
  };

  issues: Issue[];

  currentGameSettings: Settings;

  game?: ISessionGameState;
}

export interface ISessionStateClient extends SessionState {
  clientId?: number;
}
