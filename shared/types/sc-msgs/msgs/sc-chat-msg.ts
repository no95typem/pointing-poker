import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgChatMsg implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.CHAT_MSG;

  constructor(
    readonly data: {
      readonly text: string;
      readonly memberId: number;
      readonly senderMsgId: string;
    },
  ) {}
}
