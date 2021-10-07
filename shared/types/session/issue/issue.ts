import { IssuePriority } from './issue-priority';
import { RoundStat } from '../round/round-stat';
import { Synchronized } from '../../syncable';
import { ISessionGameState, ISessionIssues } from '../state/session-state';
import { ISettings } from '../../settings';

export interface Issue extends Synchronized {
  [key: string]: unknown;
  id: number;
  title: string;
  link: string;
  value?: string;
  priority: IssuePriority;
  closed: boolean;
  stat?: RoundStat;
}

export interface IIssueData {
  issue: Issue;
  settings: ISettings;
  isPlayerDealer: boolean;
  openModal: (id?: number) => void;
  removeIssue: (id: number) => void;
  openStatisticModal?: (id: number) => void;
}

export interface IIssuesData {
  issues: ISessionIssues;
  gameState?: ISessionGameState;
  addNewIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
  issuesDndChange: (from: number, to: number) => void;
  settings: ISettings;
  newIssueId: number;
  isPlayerDealer: boolean;
  userId: number;
}

export interface IIssueModal {
  gameState?: ISessionGameState;
  openModal: (id?: number) => void;
  removeIssue: (id: number) => void;
  onClose: () => void;
  changeIssue: (issue: Issue) => void;
  addNewIssue: (issue: Issue) => void;
  issuesDndChange: (from: number, to: number) => void;
  activeIssue: Issue;
  isOpen: boolean;
  isPlayerDealer: boolean;
  statisticModal: IStatisticModal;
  userId: number;
}

export interface IIssues {
  issues: ISessionIssues;
  modal: IIssueModal;
}

export interface IIssueModalData {
  issue: IIssueModal;
}

export interface IStatisticModal {
  activeIssue: Issue;
  settings: ISettings;
  onOpen: (issueId: number) => void;
  onClose: () => void;
  changeIssue: (issue: Issue) => void;
  addNewIssue: (issue: Issue) => void;
  isOpen: boolean;
  gameState?: ISessionGameState;
  isPlayerDealer: boolean;
}
