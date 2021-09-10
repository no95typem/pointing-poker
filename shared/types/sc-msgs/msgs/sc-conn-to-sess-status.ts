import { KnownErrorsKey } from '../../../knownErrorsKeys';
import { Member } from '../../session/member';
import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgConnToSessStatus implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.CONN_TO_SESS_STATUS;

  constructor(
    readonly response: {
      readonly connInfo?: {
        readonly sessionId: string;
        readonly yourMemberRec: Member;
      };
      readonly reason?: KnownErrorsKey;
    },
  ) {}
}
