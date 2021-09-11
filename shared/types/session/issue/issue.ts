import { IssuePriority } from './issue-priority';
import { RoundStat } from '../round/round-stat';
import { Synchronized } from '../../syncable';

// ? Make it class?

export interface Issue extends Synchronized {
  id: string;
  title: string;
  link: string;
  priority: IssuePriority;
  pos: number;
  closed: boolean;
  stat?: RoundStat;
}

export interface IIssueData {
  issue?: Issue;
  onClick: (id?: string) => void;
}

export interface IIssueModal {
  onClick: (id?: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export interface IIssues {
  issues: Issue[];
  modal: IIssueModal;
  editIssue: Issue | undefined;
}

export interface IIssueModalData {
  issue: IIssueModal;
  editIssue: Issue | undefined;
}
