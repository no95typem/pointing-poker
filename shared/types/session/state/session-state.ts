import { ISettings } from '../../settings';
import { Synchronized } from '../../syncable';
import { ICardsGame } from '../card';
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
  currIssueId?: number;
  isResultsVisible: boolean;
  // key number - userPublicId, val number - value of card
  votes: Record<number, string | undefined>;
}

export interface ISessionIssues extends Synchronized {
  list: Issue[];
}

export interface SessionState {
  sessionId: string;

  members: Record<number, Member>; // key - publicId od member

  name: ISessionName;

  stage: SessionStage;

  chat: {
    msgs: Record<string, ChatMsg>;
  };

  issues: ISessionIssues;

  gSettings: ISettings;

  game?: ISessionGameState;
}

export interface ISessionStateClient extends SessionState {
  clientId?: number;
}

export interface IGameStateData {
  setGameSettings: (settings: ISettings) => void;
  isPlayerDealer: boolean;
  gameState?: ISessionGameState;
  gameData: ICardsGame;
  localSettings?: ISettings;
}

export interface IConfirmation {
  isOpen: boolean;
  onClose: () => void;
  confirmData: IConfirmData;
}

export interface IConfirmData {
  action: () => void;
  description: string;
}
