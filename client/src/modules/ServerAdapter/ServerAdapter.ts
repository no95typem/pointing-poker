import {
  KnownErrorsKey,
  KNOWN_ERRORS_KEYS,
} from '../../../../shared/knownErrorsKeys';
import { CSMsg } from '../../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../../shared/types/cs-msgs/cs-msg-ciphers';
import { SCMsgChatMsg } from '../../../../shared/types/sc-msgs/msgs/sc-chat-msg';
import { SCMsgConnToSessStatus } from '../../../../shared/types/sc-msgs/msgs/sc-conn-to-sess-status';
import { SCMsg } from '../../../../shared/types/sc-msgs/sc-msg';
import { SCMSG_CIPHERS } from '../../../../shared/types/sc-msgs/sc-msg-ciphers';
import { SESSION_STAGES } from '../../../../shared/types/session/state/stages';
import { KNOWN_LOADS_KEYS } from '../../knownLoads';
import { setServerConnectionStatus } from '../../redux/slices/connect';
import { removeError, setErrorByKey } from '../../redux/slices/errors';
import { removeLoad, setLoadByKey } from '../../redux/slices/loads';

import { setSessionId, setSessionStatus } from '../../redux/slices/session';
import { store } from '../../redux/store';

class ServerAdapter {
  private apiUrl = 'ws://localhost:9000';

  private ws: WebSocket | undefined;

  private obeyTheServer = (e: MessageEvent) => {
    try {
      const parsed = JSON.parse(e.data);

      if ('cipher' in parsed) {
        switch ((parsed as SCMsg).cipher) {
          case SCMSG_CIPHERS.CONN_TO_SESS_STATUS:
            this.handleConnToSessStatus(parsed as SCMsgConnToSessStatus);

            return;
          case CSMSG_CIPHERS.CHAT_MSG:
            this.handleChatMsg(parsed as SCMsgChatMsg);

            return;

          default:
            // just ignore
            return;
        }
      }
    } catch {
      // TODO (no95typem)
    }
  };

  private handleConnToSessStatus(msg: SCMsgConnToSessStatus) {
    if (!msg.response.connInfo) {
      const errorKey: KnownErrorsKey =
        msg.response.reason || KNOWN_ERRORS_KEYS.SC_PROTOCOL_ERROR;
      store.dispatch(setErrorByKey(errorKey));
    } else {
      store.dispatch(setSessionId(msg.response.connInfo.sessionId));
      store.dispatch(setSessionStatus(SESSION_STAGES.LOBBY)); // ! TODO (no95type) remove!
    }
    store.dispatch(removeLoad('CONNECTING_TO_SERVER'));
  }

  private handleChatMsg(msg: SCMsgChatMsg) {
    // TODO
  }

  private handleWSErrorOrClose() {
    store.dispatch(setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER));

    if (this.ws) {
      this.ws.removeEventListener('message', this.obeyTheServer);
      this.ws.onopen = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      this.ws = undefined;
    }
  }

  private handleWSOpen() {
    (this.ws as WebSocket).addEventListener('message', this.obeyTheServer);
    store.dispatch(setServerConnectionStatus('connected'));
  }

  connect(): Promise<boolean> {
    store.dispatch(setLoadByKey(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
    store.dispatch(removeError(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER));

    return new Promise<boolean>(res => {
      if (this.ws) {
        // ? TODO (no95typem) disconnect from a previous server but for now:
        res(true);

        return;
      }

      const resFalse = () => {
        this.handleWSErrorOrClose();
        res(false);
      };

      try {
        this.ws = new WebSocket(this.apiUrl);
        this.ws.onopen = () => {
          this.handleWSOpen();
          res(true);
        };
        this.ws.onerror = resFalse;
        this.ws.onclose = resFalse;
      } catch {
        resFalse();
      }
    }).finally(() => {
      store.dispatch(removeLoad(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
    });
  }

  private handleSendError = FE_ALONE
    ? () => console.warn('front end is standalone mode')
    : () => {
        store.dispatch(
          setErrorByKey(KNOWN_ERRORS_KEYS.FAILED_TO_SEND_MSG_TO_SERVER),
        );
      };

  send(msg: CSMsg) {
    try {
      (this.ws as WebSocket).send(JSON.stringify(msg));
      console.log('msg sent');
    } catch (err) {
      this.handleSendError();
    }
  }
}

export const SERVER_ADAPTER = new ServerAdapter();
