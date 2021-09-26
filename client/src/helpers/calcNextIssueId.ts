import { Issue } from '../../../shared/types/session/issue/issue';

export const calcNextIssueId = (issuesList: Issue[]) => {
  const lastId = issuesList.reduce((acc, iss) => {
    return acc < iss.id ? iss.id : acc;
  }, 0);

  return lastId + 1;
};
