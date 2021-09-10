import WebSocket from 'ws';
import { genUniqIdWithCrypto } from '../../../shared/helpers/generators/node-specific';
import { CSMsgConnToSess } from '../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../shared/types/cs-msgs/cs-msg-ciphers';
import { SCMsgConnToSessStatus } from '../../../shared/types/sc-msgs/msgs/sc-conn-to-sess-status';
import { WebSocketEvent } from '../../../shared/types/ws-event';
import { SessionManager } from './SessionManager';
import { WebSocketSendFunc } from '../types';
import { KNOWN_ERRORS_KEYS } from '../../../shared/knownErrorsKeys';

export class ClientManager {
  private clients: Map<
    WebSocket,
    {
      listener: (e: WebSocketEvent) => void;
      sessId?: string;
    }
  > = new Map();

  private sessionManagers: Record<string, SessionManager> = {};

  constructor(private send: WebSocketSendFunc) {}

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
      const msg = new SCMsgConnToSessStatus({
        reason: data?.sessId
          ? KNOWN_ERRORS_KEYS.SC_ALREADY_CONNECTED_TO_SESSION
          : KNOWN_ERRORS_KEYS.SC_PROTOCOL_ERROR,
      });
      this.send(ws, msg);
    } else {
      const id = genUniqIdWithCrypto(Object.keys(this.sessionManagers));
      this.sessionManagers[id] = new SessionManager(
        {
          initWS: ws,
          initMsg,
          id,
        },
        this.send,
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
      const msg = new SCMsgConnToSessStatus({
        reason: data?.sessId
          ? KNOWN_ERRORS_KEYS.SC_ALREADY_CONNECTED_TO_SESSION
          : KNOWN_ERRORS_KEYS.SC_PROTOCOL_ERROR,
      });
      this.send(ws, msg);
    } else {
      const session = this.sessionManagers[initMsg.query.sessId];

      if (!session) {
        const msg = new SCMsgConnToSessStatus({
          reason: KNOWN_ERRORS_KEYS.SESSION_DOES_NOT_EXIST,
        });
        this.send(ws, msg);
      } else {
        session.addMember(ws, initMsg);
        this.clients.set(ws, {
          ...data,
          sessId: initMsg.query.sessId,
        });
      }
    }
  }

  private disconnectFromSession(ws: WebSocket) {
    const data = this.clients.get(ws);

    if (data?.sessId) {
      const sm = this.sessionManagers[data.sessId];

      if (sm) {
        sm.removeMember(ws);

        if (sm.getConnectedMembers().length === 0) {
          delete this.sessionManagers[data.sessId];
          console.log('terminate session');
        }
      }

      data.sessId = undefined;
    }
  }

  private clientListener = (ws: WebSocket, e: WebSocketEvent) => {
    try {
      const parsed = JSON.parse(e.data as string);

      if ('cipher' in parsed) {
        switch ((parsed as CSMsg).cipher) {
          case CSMSG_CIPHERS.CREATE_SESS:
            this.createSession(ws, parsed as CSMsgCreateSession);

            return;

          case CSMSG_CIPHERS.CONN_TO_SESS:
            console.log('conn to session');
            this.connectToSession(ws, parsed as CSMsgConnToSess);

            return;

          case CSMSG_CIPHERS.DISCONN_FROM_SESS:
            this.disconnectFromSession(ws);

            return;
          default:
            // eslint-disable-next-line no-useless-return
            return;
        }
      }
    } catch {
      //
    }
  };
}
