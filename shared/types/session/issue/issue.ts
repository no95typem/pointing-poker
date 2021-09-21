import { IssuePriority } from './issue-priority';
import { RoundStat } from '../round/round-stat';
import { Synchronized } from '../../syncable';
import { ISessionGameState, ISessionIssues } from '../state/session-state';
// import { ICardsGame } from '../card';

export interface Issue extends Synchronized {
  [key: string]:
    | number
    | string
    | IssuePriority
    | RoundStat
    | boolean
    | undefined;
  id: number;
  title: string;
  link: string;
  priority: IssuePriority;
  closed: boolean;
  stat?: RoundStat;
}

export interface IIssueData {
  issue: Issue;
  isPlayerDealer: boolean;
  openModal: (id?: number) => void;
  removeIssue: (id: number) => void;
}

export interface IIssuesData {
  issues: ISessionIssues;
  gameState?: ISessionGameState;
  addNewIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
  newIssueId: number;
  isPlayerDealer: boolean;
}

export interface IIssueModal {
  gameState?: ISessionGameState;
  openModal: (id?: number) => void;
  onClose: () => void;
  changeIssue: (issue: Issue) => void;
  addNewIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
  activeIssue: Issue;
  isOpen: boolean;
  isPlayerDealer: boolean;
}

export interface IIssues {
  issues: ISessionIssues;
  modal: IIssueModal;
}

export interface IIssueModalData {
  issue: IIssueModal;
}
