import { ChatMsg } from '../../session/chat/chat-msg';
import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgChatMsgsChanged implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.CHAT_MSG;

  constructor(
    readonly sessionId: string,
    readonly body: {
      readonly command: 'A' | 'D'; // A - assign, D - delete
      readonly update: Record<string, ChatMsg>; // if A - ChatMsg, if D - {} as ChatMsg
    },
  ) {}
}
