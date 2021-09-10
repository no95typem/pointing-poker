import WebSocket from 'ws';
import { SCMsg } from '../../shared/types/sc-msgs/sc-msg';

export type WebSocketSendFunc = (ws: WebSocket, msg: SCMsg) => boolean;
