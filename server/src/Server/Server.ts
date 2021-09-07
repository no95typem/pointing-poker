import * as http from 'http';
import * as WebSocket from 'ws';
import { Socket } from 'net';

export class PointingPokerServer {
  static readonly DEFAULT_PORT = 9000;

  private server = http.createServer();

  private wss = new WebSocket.Server({ noServer: true });

  constructor() {
    this.wss.on('connection', this.handleNewConnection);
    // eslint-disable-next-line max-params
    this.server.on('upgrade', (request, socket, head) => {
      console.log(socket);

      if (!(socket instanceof Socket)) throw new Error();
      // ! TODO: REJECT CONNECTIONS FROM OTHER THEN MY FE !!!
      try {
        // eslint-disable-next-line max-params
        this.wss.handleUpgrade(request, socket, head, ws => {
          this.wss.emit('connection', ws, request);
        });
      } catch {
        //
      }
    });
    this.server.listen(
      process.env.PORT || PointingPokerServer.DEFAULT_PORT,
      this.logStart,
    );
    // this.watchdog();
    // this.watchdogSec();
  }

  private handleNewConnection = (ws: WebSocket) => {
    console.log(ws);
    // this.connections.add(ws);
    // this.wsGamesMsgsMap.set(ws, []);
    ws.addEventListener('message', e => {
      try {
        const parsed = JSON.parse(e.data as string); // ! change to safe json parse?

        if ('cipher' in parsed) {
          switch (parsed.cipher) {
            default:
              // eslint-disable-next-line no-useless-return
              return;
          }
        }
      } catch {
        //
      }
    });

    // ws.on('pong', () => this.aliveMap.set(ws, true));

    // ws.onclose = () => this.closeConnection(ws);
    // ws.onerror = () => this.closeConnection(ws);
  };

  private logStart = () => {
    // eslint-disable-next-line no-console
    console.log(
      `Server started on port ${
        (this.server.address() as WebSocket.AddressInfo).port
      }`,
    );
  };
}
