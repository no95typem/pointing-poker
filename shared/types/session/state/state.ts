import { Settings } from 'http2';
import { Card } from '../card';
import { ChatMsg } from '../chat/chat-msg';
import { Issue } from '../issue/issue';
import { Member } from '../member';
import { RoundState } from '../round/round-state';
import { SessionStage } from './stages';

export interface SessionState<M extends Member> {
  sessionId?: string;

  dealer?: M;

  members: Record<string, M>; // key - publicId od member

  name?: { value: string; isSynced: boolean };

  state: SessionStage;

  chat: {
    isVisible: boolean;
    msgs: Record<string, ChatMsg>;
    typedText?: string;
  };

  issues: Record<string, Issue>;

  currentGameSettings?: Settings;

  game?: {
    roundState: RoundState;
    roundStartTime?: number;
    currIssueId: string;
    votes?: {
      memberPublicId: number;
      card?: Card;
    }[];
  };
}
