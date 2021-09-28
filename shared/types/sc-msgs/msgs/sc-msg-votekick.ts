import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgVotekick implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.VOTEKICK;

  constructor(
    readonly sessionId: string,
    readonly body: {
      readonly targetId: number;
      readonly initId: number;
    },
  ) {}
}
