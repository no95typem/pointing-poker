import WebSocket from 'ws';
import { genUniqIdWithCrypto } from '../../../shared/helpers/generators/node-specific';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/cs-create-session';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { SessionManager } from './SessionManager';

export class ClientManager {
  private clients: Set<WebSocket> = new Set();

  private sessionManagers: Record<string, SessionManager> = {};

  private createSession(ws: WebSocket, initMsg: CSMsgCreateSession) {
    const id = genUniqIdWithCrypto(Object.keys(this.sessionManagers));
    this.sessionManagers[id] = new SessionManager(ws, initMsg);
  }

  addClient(ws: WebSocket) {
    ws.addEventListener('message', e => {
      try {
        const parsed = JSON.parse(e.data as string);

        if ('cipher' in parsed) {
          switch ((parsed as CSMsg).cipher) {
            case 'CREATE_SESSION':
              this.createSession(ws, parsed as CSMsgCreateSession);

              return;
            default:
              // eslint-disable-next-line no-useless-return
              return;
          }
        }
      } catch {
        //
      }
    });
  }

  removeClient(ws: WebSocket) {
    // TODO (no95typem)
  }
}
