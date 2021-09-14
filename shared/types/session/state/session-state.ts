import { Settings } from '../../settings';
import { ChatMsg } from '../chat/chat-msg';
import { Issue } from '../issue/issue';
import { Member } from '../member';
import { RoundState } from '../round/round-state';
import { SessionStage } from './stages';

export interface ISessionName {
  value: string;
  isSynced: boolean;
}

export interface SessionState {
  sessionId: string;

  members: Record<number, Member>; // key - publicId od member

  name: { value: string; isSynced: boolean };

  stage: SessionStage;

  chat: {
    isVisible: boolean;
    msgs: Record<number, ChatMsg>;
    typedText: string;
  };

  issues: Issue[];

  currentGameSettings: Settings;

  game?: {
    roundState: RoundState;
    roundStartTime: number;
    currIssueIndex: number;
    // key number - userPublicId, val number - value of card
    votes: Record<number, string | undefined>;
  };
}

export interface ISessionStateClient extends SessionState {
  clientId: number;
}
