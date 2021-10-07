import WebSocket from 'ws';
import { CSMsg } from '../../shared/types/cs-msgs/cs-msg';
import { CSMsgVotekick } from '../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { SCMsg } from '../../shared/types/sc-msgs/sc-msg';
import { SessionState } from '../../shared/types/session/state/session-state';
import { UserRole } from '../../shared/types/user/user-role';
import { UserState } from '../../shared/types/user/user-state';

export type WebSocketSendFunc = (ws: WebSocket, data: string) => boolean;
export type ClientApiMsgListener = (parsedMsg: CSMsg) => void;

export interface ServerAPI {
  send: WebSocketSendFunc;
}

export interface ClientManagerAPI extends ServerAPI {
  addMsgListener: (ws: WebSocket, listener: ClientApiMsgListener) => void;
  removeMsgListener: (ws: WebSocket, listener: ClientApiMsgListener) => void;
  disconnectFromSession: (ws: WebSocket) => void;
}

export interface SessionManagerAPI extends ClientManagerAPI {
  broadcast: (msg: SCMsg, level: UserRole, skipIds?: number[]) => void;
  checkMemberState: (id: number) => UserState;
  getSessionState: () => { readonly state: Readonly<SessionState> };
  updateState: (update: Partial<SessionState>, noSend?: true) => void;
  dang_getSessState: () => SessionState;
  votekick: (ws: WebSocket, id: number, msg: CSMsgVotekick) => void;
  forcekick: (targetId: number) => void;
  kick: (id: number) => void;
  tryToEndRound: (force?: true) => void;
  endSession: () => void;
  takeFromIncubator: (id: number, allow: boolean) => void;
}
