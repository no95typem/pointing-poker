import { IssuePriority } from './issue-priority';
import { RoundStat } from '../round/round-stat';
import { Synchronized } from '../../syncable';
import { ISessionIssues } from '../state/session-state';

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
  addNewIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
  newIssueId: number;
  isPlayerDealer: boolean;
  isGameStage: boolean;
}

export interface IIssueModal {
  openModal: (id?: number) => void;
  onClose: () => void;
  changeIssue: (issue: Issue) => void;
  addNewIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
  activeIssue: Issue;
  isOpen: boolean;
  isPlayerDealer: boolean;
  isGameStage: boolean;
}

export interface IIssues {
  issues: ISessionIssues;
  modal: IIssueModal;
}

export interface IIssueModalData {
  issue: IIssueModal;
}
