import { Issue } from '../../../shared/types/session/issue/issue';

export interface IssueForRender extends Issue {
  replaceElem?: React.ReactNode;
}
