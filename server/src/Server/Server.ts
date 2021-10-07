import http from 'http';
import WebSocket from 'ws';
import { Socket } from 'net';
import internal from 'stream';
import { ClientManager } from './ClientManager';
import { WebSocketSendFunc } from '../types';
import { API_URL } from '../../../shared/const';

console.log('API_URL:', API_URL);

export class PointingPokerServer {
  static readonly DEFAULT_PORT = 9000;

  static readonly SELF_STIMULATING_INTERVAL = 900_000; // 15min

  private httpRequestsListener: http.RequestListener = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ) => {
    console.warn(
      `API schema violation
      from ip: ${req.socket.remoteAddress},
      forwarder for: ${req.headers['x-forwarded-for']}`,
    );
    res.statusCode = 400;
    res.end('API schema violation');
  };

  private server = http.createServer(this.httpRequestsListener);

  private wss = new WebSocket.Server({ noServer: true });

  private connections: Set<WebSocket> = new Set();

  private aliveMap: Map<WebSocket, boolean> = new Map();

  private send = (ws: WebSocket, data: string) => {
    try {
      ws.send(data);

      return true;
    } catch (err) {
      console.error('error when sending msg through ws:', data);
      this.closeConnection(ws);

      return false;
    }
  };

  private clientManager = new ClientManager(
    this.send as unknown as WebSocketSendFunc,
  );

  private lastStimulationTime = Date.now();

  constructor() {
    this.wss.on('connection', this.handleNewConnection);

    this.server.on('upgrade', this.handleHttpUpgrade);

    this.server.on('connection', () => {
      this.lastStimulationTime = Date.now();
    });

    this.server.listen(
      process.env.PORT || PointingPokerServer.DEFAULT_PORT,
      this.logStart,
    );

    this.watchdog();
  }

  /* eslint-disable max-params */
  private handleHttpUpgrade = (
    request: http.IncomingMessage,
    socket: internal.Duplex,
    head: Buffer,
  ) => {
    try {
      // TODO (no95typem): FILTER BY ORIGIN
      if (!(socket instanceof Socket)) throw new Error();
      this.wss.handleUpgrade(request, socket, head, ws => {
        this.wss.emit('connection', ws, request);
      });
    } catch {
      try {
        socket.destroy();
        request.destroy();
      } catch (err) {
        console.error(err);
      }
    }
  };
  /* eslint-enable max-params */

  private handleNewConnection = (ws: WebSocket) => {
    this.connections.add(ws);
    ws.on('pong', () => this.aliveMap.set(ws, true));
    ws.on('ping', () => {
      try {
        ws.pong();
      } catch {
        console.error('error on ws.pong()');
      }
    });
    ws.onclose = () => this.closeConnection(ws);
    ws.onerror = () => this.closeConnection(ws);
    this.clientManager.addClient(ws);
  };

  private closeConnection(ws: WebSocket) {
    try {
      this.clientManager.removeClient(ws);
      ws.removeAllListeners();
      ws.close(1001);
      this.connections.delete(ws);
      this.aliveMap.delete(ws);
    } catch (err) {
      console.error('error when closing connetcion on ws:', err);
    }
  }

  private async watchdog() {
    const checks = [...this.connections].map(ws => this.checkConnection(ws)); // this.connections.add(ws);

    if (checks.length === 0) {
      setTimeout(() => this.watchdog(), 10_000);

      return;
    }

    this.watchdogSelf();
    Promise.all(checks).finally(() => this.watchdog());
  }

  private watchdogSelf() {
    try {
      const time = Date.now();

      if (
        time - this.lastStimulationTime >
        PointingPokerServer.SELF_STIMULATING_INTERVAL
      ) {
        console.log('stimulating myself...');
        const ws = new WebSocket(API_URL);
        ws.onopen = () => {
          try {
            ws.close();
            console.log('stimulating myself done succesfully');
          } catch {}
        };
      }
    } catch {}
  }

  private async checkConnection(ws: WebSocket) {
    this.aliveMap.set(ws, false);

    try {
      ws.ping();

      await new Promise(res => setTimeout(res, 10_000));

      if (this.aliveMap.get(ws) === false) throw new Error();

      return true;
    } catch {
      console.error('error in checkConnection ws.ping()');

      this.closeConnection(ws);

      return false;
    }
  }

  private logStart = () => {
    // eslint-disable-next-line no-console
    console.log(
      `Server started on port ${
        (this.server.address() as WebSocket.AddressInfo).port
      }`,
    );
  };
}
