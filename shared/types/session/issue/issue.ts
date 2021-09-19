import { IssuePriority } from './issue-priority';
import { RoundStat } from '../round/round-stat';
import { Synchronized } from '../../syncable';

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
  editIssue: (id?: number) => void;
  removeIssue: (id: number) => void;
}

export interface IIssuesData {
  issues: Issue[];
  newIssueId: number;
  addNewIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
}

export interface IIssueModal {
  onClick: (id?: number) => void;
  onClose: () => void;
  changeIssue: (issue: Issue) => void;
  addNewIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
  isOpen: boolean;
  activeIssue: Issue;
}

export interface IIssues {
  issues: Issue[];
  modal: IIssueModal;
}

export interface IIssueModalData {
  issue: IIssueModal;
}
