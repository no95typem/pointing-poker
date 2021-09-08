import { CSMsg } from '../../../../shared/types/cs-msgs/cs-msg';
import { SCMsgSessionCreated } from '../../../../shared/types/sc-msgs/msgs/session-created';
import { SCMsg } from '../../../../shared/types/sc-msgs/sc-msg';
import { KNOWN_ERRORS_KEYS } from '../../knownErrors';
import { KNOWN_LOADS_KEYS } from '../../knownLoads';
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
          case 'SESSION_CREATED':
            // TODO (no95typem) compare equality of reqId and resId
            this.handleSessionCreated(parsed as SCMsgSessionCreated);

            return;

          default:
            throw new Error(); // TODO (no95typem)
        }
      }
    } catch {
      // TODO (no95typem)
    }
  };

  private handleSessionCreated(msg: SCMsgSessionCreated) {
    store.dispatch(setSessionId(msg.sessionId));
    store.dispatch(setSessionStatus('LOBBY'));
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

      setTimeout(() => {
        try {
          this.ws = new WebSocket(this.apiUrl);
          this.ws.addEventListener('open', () => {
            (this.ws as WebSocket).addEventListener(
              'message',
              this.obeyTheServer,
            );
            res(true);
          });
          this.ws.addEventListener('error', e => {
            console.log(e);
            store.dispatch(
              setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER),
            );
            this.ws = undefined;
            res(false);
          });
          this.ws.addEventListener('close', e => {
            console.log(e);
            store.dispatch(
              setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER),
            );
            this.ws = undefined;
            res(false);
          });
        } catch (err) {
          res(false);
          console.log(err);
          store.dispatch(
            setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER),
          );
          this.ws = undefined;
        }
      }, 2000);
    }).finally(() => {
      store.dispatch(removeLoad(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
    });
  }

  send(msg: CSMsg) {
    try {
      (this.ws as WebSocket).send(JSON.stringify(msg));
      console.log('msg sent');
    } catch (err) {
      store.dispatch(
        setErrorByKey(KNOWN_ERRORS_KEYS.FAILED_TO_SEND_MSG_TO_SERVER),
      );
    }
  }
}

export const SERVER_ADAPTER = new ServerAdapter();
