import WebSocket from 'ws';
import { SCMsg } from '../../../shared/types/sc-msgs/sc-msg';
import { UserRole } from '../../../shared/types/user/user-role';
import { WebSocketEvent } from '../../../shared/types/ws-event';

export abstract class RoleManager {
  private serviceData: Record<
    number,
    {
      ws: WebSocket;
      listener: () => void;
    }
  > = {};

  constructor(private broadcast: (msg: SCMsg, level: UserRole) => void) {}

  addMember(ws: WebSocket, id: number) {
    const listener = this.listen.bind(this, ws, id) as () => void;
    this.serviceData[id] = { ws, listener };
    ws.addEventListener('message', listener);
  }

  protected abstract listen: (
    ws: WebSocket,
    id: number,
    e: WebSocketEvent,
  ) => void;

  getWebSockets(): WebSocket[] {
    return Object.values(this.serviceData).map(data => data.ws);
  }
}
