import { IssuePriority } from './issue-priority';
import { RoundStat } from '../round/round-stat';
import { Synchronized } from '../../syncable';

export interface Issue extends Synchronized {
  id: number;
  title: string;
  link: string;
  priority: IssuePriority;
  closed: boolean;
  stat?: RoundStat;
}

export interface IIssueData {
  issue?: Issue;
  onClick: (id?: number) => void;
}

export interface IIssueModal {
  onClick: (id?: number) => void;
  onClose: () => void;
  isOpen: boolean;
  editIssue: Issue | undefined;
}

export interface IIssues {
  issues: Issue[];
  modal: IIssueModal;
}

export interface IIssueModalData {
  issue: IIssueModal;
}
