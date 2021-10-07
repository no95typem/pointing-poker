import XLSX from 'xlsx';
import { Issue } from '../../../shared/types/session/issue/issue';
import {
  IssuePriority,
  ISSUE_PRIORITIES,
} from '../../../shared/types/session/issue/issue-priority';

export const isIssue = (obj: unknown) => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'title' in obj &&
    (typeof (obj as Record<string, unknown>)['title'] === 'string' ||
      typeof (obj as Record<string, unknown>)['title'] === 'number') &&
    'link' in obj &&
    // typeof (obj as Record<string, unknown>).link === 'string' &&
    'priority' in obj
  );
  // typeof (obj as Record<string, unknown>).priority === 'string'
};

const calcPriority = (val: unknown) => {
  if (typeof val === 'string') {
    const uppercased = val.toUpperCase();
    switch (uppercased) {
      case ISSUE_PRIORITIES.LOW:
      case ISSUE_PRIORITIES.MEDIUM:
      case ISSUE_PRIORITIES.HIGH:
        return uppercased;
      default:
        return ISSUE_PRIORITIES.MEDIUM;
    }
  }

  return ISSUE_PRIORITIES.MEDIUM;
};

export const importIssuesFromWorkbook = (wb: XLSX.WorkBook) => {
  const issues: Issue[] = [];

  wb.SheetNames.forEach(name => {
    const ws = wb.Sheets[name];
    const arr = XLSX.utils.sheet_to_json(ws, { defval: null });
    arr.forEach(el => {
      try {
        const obj =
          typeof el === 'string'
            ? JSON.parse(el)
            : typeof el === 'object' && el !== null
            ? el
            : undefined;

        if (isIssue(obj)) {
          const issue: Issue = {
            id: issues.length,
            title: `${obj['title']}`,
            link: `${obj['link']}` || '',
            priority: calcPriority(obj['priority']),
            closed: false,
            isSynced: false,
          };
          issues.push(issue);
        }
      } catch {}
    });
  });

  return issues.filter(iss => iss.title);
};

export const exportTemplate = () => {
  const wb = XLSX.utils.book_new();
  const template: Issue = {
    title: '',
    link: '',
    priority: '' as IssuePriority,
  } as Issue;
  const ws = XLSX.utils.json_to_sheet([template]);
  XLSX.utils.book_append_sheet(wb, ws, 'issues');
  XLSX.writeFile(wb, 'issues-template.xlsx');
};
