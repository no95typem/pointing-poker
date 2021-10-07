import { UserInfo } from '../../user/user-info';
import { UserRole } from '../../user/user-role';
import { CSMsg } from '../cs-msg';
import { CSMSG_CIPHERS } from '../cs-msg-ciphers';

export class CSMsgConnToSess implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.CONN_TO_SESS;

  constructor(
    readonly query: {
      readonly sessId: string;
      readonly info: UserInfo;
      readonly role: UserRole;
      readonly token?: string;
    },
  ) {}
}
