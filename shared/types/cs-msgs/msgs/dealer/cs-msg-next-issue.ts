import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgNextIssue implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.NEXT_ISSUE;
}
