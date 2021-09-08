import { CSMsg } from '../../../../shared/types/cs-msgs/cs-msg';
import { SCMsgSessionCreated } from '../../../../shared/types/sc-msgs/msgs/session-created';
import { SCMsg } from '../../../../shared/types/sc-msgs/sc-msg';
import { setConnectionStatus, setWSStatus } from '../../redux/slices/connect';
import { AppError, setError } from '../../redux/slices/errors';
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
    store.dispatch(setConnectionStatus('connected'));
    store.dispatch(setSessionId(msg.sessionId));
    store.dispatch(setSessionStatus('LOBBY'));
  }

  connect(): Promise<boolean> {
    return new Promise(res => {
      if (this.ws) {
        // ? TODO (no95typem)
        // ? disconnect from a previous server
        // but for now:
        res(true);

        return;
      }
      store.dispatch(setWSStatus('connecting'));
      setTimeout(() => {
        try {
          this.ws = new WebSocket(this.apiUrl);
          this.ws.addEventListener('open', () => {
            (this.ws as WebSocket).addEventListener(
              'message',
              this.obeyTheServer,
            );
            store.dispatch(setWSStatus('alive'));
            res(true);
          });
          this.ws.addEventListener('error', e => {
            console.log(e);
            store.dispatch(setWSStatus('dead'));
            this.ws = undefined;
            res(false);
          });
          this.ws.addEventListener('close', e => {
            console.log(e);
            store.dispatch(setWSStatus('dead'));
            this.ws = undefined;
            res(false);
          });
        } catch (err) {
          res(false);
          console.log(err);
          store.dispatch(setWSStatus('dead'));
          this.ws = undefined;
        }
      }, 2000);
    });
  }

  send(msg: CSMsg) {
    try {
      (this.ws as WebSocket).send(JSON.stringify(msg));
      console.log('msg sent');
    } catch (err) {
      const appError: AppError = {
        type: 'communication',
        reason: 'failed to send msg through ws',
        more: String(err),
      };
      store.dispatch(setError(appError));
    }
  }
}

export const SERVER_ADAPTER = new ServerAdapter();
