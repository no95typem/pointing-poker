import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMsgVotekick implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.VOTEKICK;

  constructor(
    readonly body: {
      readonly target: number;
      readonly decision: boolean;
      readonly isAnswer: boolean;
    },
  ) {}
}
