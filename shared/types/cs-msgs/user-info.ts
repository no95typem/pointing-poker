import { UserInfo } from '../user/user-info';
import { CSMsg } from './cs-msg';
import { CSMSG_CIPHERS } from './cs-msg-ciphers';

export class CSMsgUserInfo implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.USER_INFO;

  constructor(readonly userInfo: UserInfo) {}
}
