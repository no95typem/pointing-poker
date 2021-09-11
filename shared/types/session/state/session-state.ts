import { Settings } from '../../settings';
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

  stage: SessionStage;

  chat: {
    isVisible: boolean;
    msgs: Record<number, ChatMsg>;
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
