import { KnownErrorsKey } from '../../../knownErrorsKeys';
import { SessionState } from '../../session/state/session-state';
import { SCMsg } from '../sc-msg';
import { SCMSG_CIPHERS } from '../sc-msg-ciphers';

export class SCMsgConnToSessStatus implements SCMsg {
  readonly cipher = SCMSG_CIPHERS.CONN_TO_SESS_STATUS;

  constructor(
    readonly sessionId: string,
    readonly response: {
      readonly success?: {
        readonly yourId: number;
        readonly state: SessionState;
      };
      readonly wait?: {
        readonly token: string;
        readonly sessId: string;
      };
      readonly fail?: {
        readonly reason?: KnownErrorsKey;
      };
    },
  ) {}
}
