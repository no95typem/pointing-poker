import {
  KnownErrorsKey,
  KNOWN_ERRORS_KEYS,
} from '../../../../shared/knownErrorsKeys';
import { CSMsg } from '../../../../shared/types/cs-msgs/cs-msg';
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
            // TODO (no95typem) compare equality of reqId and resId
            this.handleConnToSessStatus(parsed as SCMsgConnToSessStatus);

            return;

          default:
            throw new Error(); // TODO (no95typem)
        }
      }
    } catch {
      // TODO (no95typem)
    }
  };

  private handleConnToSessStatus(msg: SCMsgConnToSessStatus) {
    console.log(msg);

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

  connect(): Promise<boolean> {
    store.dispatch(setLoadByKey(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
    store.dispatch(removeError(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER));

    return new Promise<boolean>(res => {
      if (this.ws) {
        // ? TODO (no95typem)
        // ? disconnect from a previous server
        // but for now:
        res(true);

        return;
      }

      try {
        this.ws = new WebSocket(this.apiUrl);
        this.ws.addEventListener('open', () => {
          (this.ws as WebSocket).addEventListener(
            'message',
            this.obeyTheServer,
          );
          res(true);
          store.dispatch(setServerConnectionStatus('connected'));
        });
        this.ws.addEventListener('error', e => {
          store.dispatch(
            setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER),
          );
          this.ws = undefined;
          res(false);
        });
        this.ws.addEventListener('close', e => {
          store.dispatch(
            setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER),
          );
          this.ws = undefined;
          res(false);
        });
      } catch (err) {
        res(false);
        store.dispatch(
          setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER),
        );
        this.ws = undefined;
      }
    }).finally(() => {
      store.dispatch(removeLoad(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
    });
  }

  send(msg: CSMsg) {
    try {
      (this.ws as WebSocket).send(JSON.stringify(msg));
      console.log('msg sent');
    } catch (err) {
      !FE_ALONE &&
        store.dispatch(
          setErrorByKey(KNOWN_ERRORS_KEYS.FAILED_TO_SEND_MSG_TO_SERVER),
        );
    }
  }
}

export const SERVER_ADAPTER = new ServerAdapter();
