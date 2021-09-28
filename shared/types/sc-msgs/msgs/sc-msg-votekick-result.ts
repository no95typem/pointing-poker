import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

// no votes if cancelled!

export class SCMsgVotekickResult implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.VOTEKICK_RESULT;

  constructor(
    readonly sessionId: string,
    readonly data: {
      readonly targetId: number;
      readonly result: boolean;
      readonly votes?: Record<number, boolean>;
    },
  ) {}
}
