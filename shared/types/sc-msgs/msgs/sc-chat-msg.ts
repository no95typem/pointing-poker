import { ChatMsg } from '../../session/chat/chat-msg';
import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgChatMsg implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.CHAT_MSG;

  constructor(readonly msg: ChatMsg) {}
}
