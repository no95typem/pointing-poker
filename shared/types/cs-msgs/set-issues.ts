import { Issue } from '../session/issue/issue';
import { CSMsg } from './cs-msg';
import { CSMSG_CIPHERS } from './cs-msg-ciphers';

export class CSMsgSetIssues implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.SET_ISSUES;

  constructor(readonly issues: Record<string, Issue>) {}
}
