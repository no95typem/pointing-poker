import { ISettings } from '../../settings';
import { UserInfo } from '../../user/user-info';
import { CSMsg } from '../cs-msg';
import { CSMSG_CIPHERS } from '../cs-msg-ciphers';

export class CSMsgCreateSession implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.CREATE_SESS;

  constructor(
    readonly query: {
      readonly controlKey: string;
      readonly userInfo: UserInfo;
      readonly settings: ISettings;
    },
  ) {}
}
