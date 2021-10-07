import WebSocket from 'ws';
import { CSMsg } from '../../../shared/types/cs-msgs/cs-msg';
import { ClientApiMsgListener, SessionManagerAPI } from '../types';

export abstract class RoleManager {
  private serviceData: Record<
    number,
    {
      ws: WebSocket;
      listener: ClientApiMsgListener;
    }
  > = {};

  constructor(protected api: SessionManagerAPI) {}

  addMember(ws: WebSocket, id: number) {
    const listener = this.listen.bind(this, ws, id);
    this.serviceData[id] = { ws, listener };
    this.api.addMsgListener(ws, listener);
  }

  removeMember(ws: WebSocket, id: number) {
    const data = this.serviceData[id];

    if (data) {
      this.api.removeMsgListener(data.ws, data.listener);
      delete this.serviceData[id];
    }
  }

  protected abstract listen: (
    ws: WebSocket,
    id: number,
    parsedMsg: CSMsg,
  ) => void;

  getMembers() {
    return Object.entries(this.serviceData).map(entry => {
      return {
        id: +entry[0],
        ws: entry[1].ws,
      };
    });
  }
}
