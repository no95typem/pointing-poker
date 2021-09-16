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
  addMsgListener: (listener: ClientApiMsgListener) => void;
  removeMsgListener: (listener: ClientApiMsgListener) => void;
}

export interface SessionManagerAPI extends ClientManagerAPI {
  broadcast: (msg: SCMsg, level: UserRole, skipIds?: number[]) => void;
  checkMemberState: (id: number) => UserState;
  getSessionState: () => { readonly state: Readonly<SessionState> };
  updateState: (update: Partial<SessionState>) => void;
  votekick: (ws: WebSocket, id: number, msg: CSMsgVotekick) => void;
  forcekick: (targetId: number) => void;
  kick: (id: number) => void;
  tryToEndRound: (force?: true) => void;
  endSession: () => void;
}
