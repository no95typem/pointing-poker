import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import { purify } from '../../../../shared/helpers/processors/purify';
import {
  KnownErrorsKey,
  KNOWN_ERRORS_KEYS,
} from '../../../../shared/knownErrorsKeys';
import { CSMsg } from '../../../../shared/types/cs-msgs/cs-msg';
import { CSMSG_CIPHERS } from '../../../../shared/types/cs-msgs/cs-msg-ciphers';
import { CSMsgDisconFromSess } from '../../../../shared/types/cs-msgs/msgs/cs-disconn-from-sess';
import { CSMsgUpdateState } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-update-state';
import { CSMsgStartGame } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-start-game';
import { SCMsgChatMsgsChanged } from '../../../../shared/types/sc-msgs/msgs/sc-msg-chat-msgs-changed';
import { SCMsgConnToSessStatus } from '../../../../shared/types/sc-msgs/msgs/sc-msg-conn-to-sess-status';
import { SCMsgMembersChanged } from '../../../../shared/types/sc-msgs/msgs/sc-msg-members-changed';
import { SCMsg } from '../../../../shared/types/sc-msgs/sc-msg';
import { SCMSG_CIPHERS } from '../../../../shared/types/sc-msgs/sc-msg-ciphers';
import { Member } from '../../../../shared/types/session/member';
import { KNOWN_LOADS_KEYS } from '../../../../shared/knownLoadsKeys';
import { setServerConnectionStatus } from '../../redux/slices/connect';
import { removeError, setErrorByKey } from '../../redux/slices/errors';
import { removeLoad, setGLoadByKey } from '../../redux/slices/loads';
import { sessionSlice } from '../../redux/slices/session';

import { store } from '../../redux/store';
import { SessionState } from '../../../../shared/types/session/state/session-state';
import { SESSION_STAGES } from '../../../../shared/types/session/state/stages';

const updateState = sessionSlice.actions.dang_updSessStateFromServer;

class ServerAdapter {
  private apiUrl = IS_PROD
    ? 'wss://rss-react-2021q3-pp.herokuapp.com/'
    : 'ws://localhost:9000';

  private ws: WebSocket | undefined;

  private obeyTheServer = (e: MessageEvent) => {
    try {
      // console.log(e.data);
      const parsed = JSON.parse(e.data);
      const purified = purify(parsed);

      console.log(`received msg, cipher: ${purified.cipher}`);

      if ('cipher' in purified) {
        switch ((purified as SCMsg).cipher) {
          case SCMSG_CIPHERS.CONN_TO_SESS_STATUS:
            this.handleConnToSessStatus(purified as SCMsgConnToSessStatus);

            return;
          case CSMSG_CIPHERS.CHAT_MSG:
            this.handleChatMsg(purified as SCMsgChatMsgsChanged);

            return;

          case SCMSG_CIPHERS.UPDATE_SESSION_STATE:
            this.takeoffLoadBySessStateUpdate(
              (purified as CSMsgUpdateState).update,
            );
            store.dispatch(updateState((purified as CSMsgUpdateState).update));

            return;
          case SCMSG_CIPHERS.MEMBERS_CHANGED:
            this.handleMembersChanged(purified as SCMsgMembersChanged);

            return;

          default:
            // just ignore
            return;
        }
      }
    } catch (err) {
      console.log(err);
      // TODO (no95typem)
    }
  };

  private takeoffLoadBySessStateUpdate(update: Partial<SessionState>) {
    if (update.stage) {
      store.dispatch(removeLoad(KNOWN_LOADS_KEYS.SESSION_STAGE_CHANGE));
    }
  }

  private handleConnToSessStatus(msg: SCMsgConnToSessStatus) {
    if (!msg.response.success) {
      const errorKey: KnownErrorsKey =
        msg.response.fail?.reason || KNOWN_ERRORS_KEYS.SC_PROTOCOL_ERROR;
      store.dispatch(setErrorByKey(errorKey));
    } else {
      store.dispatch(updateState(msg.response.success.state));
      const clientId = msg.response.success.yourId;
      store.dispatch(updateState({ clientId }));
    }
    store.dispatch(removeLoad('CONNECTING_TO_SERVER'));
  }

  private handleMembersChanged(msg: SCMsgMembersChanged) {
    const members = OBJ_PROCESSOR.deepClone(store.getState().session.members);

    Object.entries(msg.update).forEach(([id, member]) => {
      if (members[+id]) {
        Object.assign(members[+id], member);
      } else {
        members[+id] = member as Member;
      }
    });

    const newMembers: Record<number, Member> = {};
    Object.assign(newMembers, members);

    // console.log(newMembers);
    store.dispatch(updateState({ members: newMembers }));
  }

  private handleChatMsg(msg: SCMsgChatMsgsChanged) {
    store.dispatch(sessionSlice.actions.updChatMsgs(msg));
  }

  private handleWSErrorOrClose() {
    console.log('err');
    store.dispatch(setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER));

    if (this.ws) {
      this.ws.removeEventListener('message', this.obeyTheServer);
      this.ws.onopen = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      this.ws = undefined;
    }
  }

  private handleWSOpen() {
    (this.ws as WebSocket).addEventListener('message', this.obeyTheServer);
    store.dispatch(setServerConnectionStatus('connected'));
  }

  connect(): Promise<boolean> {
    store.dispatch(
      setGLoadByKey({
        loadKey: KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER,
        errorKey: KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER,
      }),
    );
    store.dispatch(removeError(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER));

    return new Promise<boolean>(res => {
      if (this.ws) {
        // ? TODO (no95typem) disconnect from a previous server but for now:
        res(true);

        return;
      }

      const resFalse = () => {
        this.handleWSErrorOrClose();
        res(false);
      };

      try {
        this.ws = new WebSocket(this.apiUrl);
        this.ws.onopen = () => {
          this.handleWSOpen();
          res(true);
        };
        this.ws.onerror = resFalse;
        this.ws.onclose = resFalse;
      } catch {
        resFalse();
      }
    }).finally(() => {
      store.dispatch(removeLoad(KNOWN_LOADS_KEYS.CONNECTING_TO_SERVER));
    });
  }

  private handleSendError = FE_ALONE
    ? () => console.warn('front end in standalone mode')
    : () => {
        store.dispatch(
          setErrorByKey(KNOWN_ERRORS_KEYS.FAILED_TO_SEND_MSG_TO_SERVER),
        );
      };

  send = (msg: CSMsg) => {
    try {
      (this.ws as WebSocket).send(JSON.stringify(msg));
      console.log('msg sent');
    } catch (err) {
      console.log(err);
      this.handleSendError();
    }
  };

  exitGame = () => {
    store.dispatch(updateState({ stage: SESSION_STAGES.EMPTY }));
    const msg = new CSMsgDisconFromSess();
    this.send(msg);
  };

  startGame = () => {
    store.dispatch(
      setGLoadByKey({
        loadKey: KNOWN_LOADS_KEYS.SESSION_STAGE_CHANGE,
      }),
    );
    const msg = new CSMsgStartGame();
    this.send(msg);
  };
}

export const SERVER_ADAPTER = new ServerAdapter();
