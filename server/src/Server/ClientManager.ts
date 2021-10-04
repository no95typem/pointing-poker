import WebSocket from 'ws';
import { genUniqIdWithCrypto } from '../../../shared/helpers/generators/node-specific';
import { CSMsgConnToSess } from '../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { WebSocketEvent } from '../../../shared/types/ws-event';
import { SessionManager } from './SessionManager';
import {
  ClientApiMsgListener,
  ClientManagerAPI,
  WebSocketSendFunc,
} from '../types';
import { KNOWN_ERRORS_KEYS } from '../../../shared/knownErrorsKeys';
import { SCMsgConnToSessStatus } from '../../../shared/types/sc-msgs/msgs/sc-msg-conn-to-sess-status';

export class ClientManager {
  private clients: Map<
    WebSocket,
    {
      listener: (e: WebSocketEvent) => void;
      sessId?: string;
    }
  > = new Map();

  private sessionManagers: Record<string, SessionManager> = {};

  private apiListeners: Map<WebSocket, Set<ClientApiMsgListener>> = new Map();

  private api: ClientManagerAPI;

  constructor(private send: WebSocketSendFunc) {
    this.api = {
      send: this.send,
      disconnectFromSession: this.disconnectFromSession,
      addMsgListener: (ws: WebSocket, listener: ClientApiMsgListener) => {
        let listeners = this.apiListeners.get(ws);

        if (!listeners) {
          listeners = new Set();
          this.apiListeners.set(ws, listeners);
        }

        listeners.add(listener);
      },
      removeMsgListener: (ws: WebSocket, listener: ClientApiMsgListener) =>
        this.apiListeners.get(ws)?.delete(listener),
    };
  }

  addClient(ws: WebSocket) {
    const listener = this.clientListener.bind(this, ws);
    this.clients.set(ws, { listener });
    ws.addEventListener('message', listener as () => void);
  }

  removeClient(ws: WebSocket) {
    const data = this.clients.get(ws);

    if (!data) return; // TODO (no95typem) a logic error (it's unpossible I think)

    this.disconnectFromSession(ws);

    ws.removeEventListener('message', data.listener as () => void);
    this.clients.delete(ws);
  }

  private createSession(ws: WebSocket, initMsg: CSMsgCreateSession) {
    const data = this.clients.get(ws);

    if (!data || data.sessId) {
      const msg = new SCMsgConnToSessStatus(initMsg.query.controlKey, {
        fail: {
          reason: data?.sessId
            ? KNOWN_ERRORS_KEYS.SC_ALREADY_CONNECTED_TO_SESSION
            : KNOWN_ERRORS_KEYS.SC_PROTOCOL_ERROR,
        },
      });
      this.send(ws, JSON.stringify(msg));
    } else {
      const id = genUniqIdWithCrypto(Object.keys(this.sessionManagers));
      this.sessionManagers[id] = new SessionManager(
        {
          initWS: ws,
          initMsg,
          id,
        },
        this.api,
      );
      this.clients.set(ws, {
        ...data,
        sessId: id,
      });
    }
  }

  private connectToSession(ws: WebSocket, initMsg: CSMsgConnToSess) {
    const data = this.clients.get(ws);

    if (!data || data.sessId) {
      const msg = new SCMsgConnToSessStatus(initMsg.query.sessId, {
        fail: {
          reason: data?.sessId
            ? KNOWN_ERRORS_KEYS.SC_ALREADY_CONNECTED_TO_SESSION
            : KNOWN_ERRORS_KEYS.SC_PROTOCOL_ERROR,
        },
      });
      this.send(ws, JSON.stringify(msg));
    } else {
      const session = this.sessionManagers[initMsg.query.sessId];

      if (!session) {
        const msg = new SCMsgConnToSessStatus(initMsg.query.sessId, {
          fail: {
            reason: KNOWN_ERRORS_KEYS.SESSION_DOES_NOT_EXIST,
          },
        });
        this.send(ws, JSON.stringify(msg));
      } else {
        session.addMember(ws, initMsg);
        this.clients.set(ws, {
          ...data,
          sessId: initMsg.query.sessId,
        });
      }
    }
  }

  private disconnectFromSession = (ws: WebSocket) => {
    const data = this.clients.get(ws);

    if (data?.sessId) {
      const sm = this.sessionManagers[data.sessId];

      if (sm) {
        sm.removeMember(ws);

        if (sm.getConnectedMembers().length === 0) {
          delete this.sessionManagers[data.sessId];
          console.log(`terminate session ${data.sessId}`);
        }
      }

      data.sessId = undefined;
    }
  };

  private pureParse = (ws: WebSocket, parsed: any) => {
    if ('cipher' in parsed) {
      switch ((parsed as CSMsg).cipher) {
        case CSMSG_CIPHERS.CREATE_SESS:
          this.createSession(ws, parsed as CSMsgCreateSession);
          break;
        case CSMSG_CIPHERS.CONN_TO_SESS:
          this.connectToSession(ws, parsed as CSMsgConnToSess);
          break;
        case CSMSG_CIPHERS.DISCONN_FROM_SESS:
          this.disconnectFromSession(ws);
          break;
        default:
          this.apiListeners.get(ws)?.forEach(listener => {
            try {
              listener(parsed as CSMsg);
            } catch (err) {
              console.error('error in a api listener:', err);
            }
          });
          break;
      }
    }
  };

  private debugParse = (ws: WebSocket, parsed: any) => {
    setTimeout(() => {
      try {
        this.pureParse(ws, parsed);
      } catch (err) {
        console.error('unrecognized error:', err);
      }
    }, 2000);
  };

  private parseFunc = IS_PROD ? this.pureParse : this.debugParse;

  private clientListener = (ws: WebSocket, e: WebSocketEvent) => {
    try {
      const parsed = JSON.parse(e.data as string);
      this.parseFunc(ws, parsed);
    } catch (err) {
      console.error('unrecognized error:', err);
    }
  };
}
