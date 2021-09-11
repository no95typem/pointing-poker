/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { WebSocketEvent } from '../../../shared/types/ws-event';
import { RoleManager } from './RoleManager';

export class PlayersManager extends RoleManager {
  protected listen = (ws: WebSocket, id: number, e: WebSocketEvent) => {};
}
