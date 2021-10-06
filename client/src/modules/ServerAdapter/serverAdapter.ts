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
import { removeError, setErrorByKey } from '../../redux/slices/errors';
import { removeLoad, setGLoadByKey } from '../../redux/slices/loads';
import { store } from '../../redux/store';
import { sessionSlice, setSynced } from '../../redux/slices/session';
import { SessionState } from '../../../../shared/types/session/state/session-state';
import { SESSION_STAGES } from '../../../../shared/types/session/state/stages';
import { SCMsgVotekick } from '../../../../shared/types/sc-msgs/msgs/sc-msg-votekick';
import { showKickDialog } from '../../helpers/showKickDialog';

// import { getCookieValByName } from '../../helpers/getCookie';
import { CSMsgConnToSess } from '../../../../shared/types/cs-msgs/msgs/cs-conn-to-sess';
import { CSMsgCreateSession } from '../../../../shared/types/cs-msgs/msgs/cs-create-sess';
import { SCMsgNewConnection } from '../../../../shared/types/sc-msgs/msgs/sc-msg-new-connection';
import { INotification, addNotifRec } from '../../redux/slices/notifications';
import { CSMSGNewConnectionResponse } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-new-connection-response';
import { CSMsgEndGame } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-end-game';
import { ISettings } from '../../../../shared/types/settings';
import { CSMsgForceKick } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-force-kick';
import { CSMsgVotekick } from '../../../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { API_URL, DEALER_ID } from '../../../../shared/const';
import { USER_STATES } from '../../../../shared/types/user/user-state';
import { CSMsgChatMsg } from '../../../../shared/types/cs-msgs/msgs/spectator/cs-msg-chat-msg';
import { ChatMsg } from '../../../../shared/types/session/chat/chat-msg';
import { CSMsgPick } from '../../../../shared/types/cs-msgs/msgs/player/cs-msg-pick';
import { CSMsgStartRound } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-start-round';
import { CSMsgStopRound } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-stop-round';
import { CSMsgNextIssue } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-next-issue';
import { genUniqId } from '../../../../shared/helpers/generators/browser-specific';
import { CSMSgToggleResultsVisibility } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-toggle-results-visibility';
import { chatSound } from '../../helpers/chatSound';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';

export interface IKickArgs {
  targetId: number;
  decision: boolean;
  initId?: number;
}

class ServerAdapter {
  private ws: WebSocket | undefined;

  private lastToken: string | undefined;

  private controlKey: string | undefined;

  /* MAINTAIN CONNECTION */

  private handleWSOpen() {
    (this.ws as WebSocket).addEventListener('message', this.obeyTheServer);
  }

  private handleWSErrorOrClose() {
    console.error('ws err');
    store.dispatch(setErrorByKey(KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER));

    if (this.ws) {
      this.ws.removeEventListener('message', this.obeyTheServer);
      this.ws.onopen = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      this.ws = undefined;
    }
  }

  private handleSendError = FE_ALONE
    ? () => console.warn('front end in standalone mode')
    : () => {
        store.dispatch(
          setErrorByKey(KNOWN_ERRORS_KEYS.FAILED_TO_SEND_MSG_TO_SERVER),
        );
      };

  private send = (msg: CSMsg) => {
    try {
      (this.ws as WebSocket).send(JSON.stringify(msg));
    } catch (err) {
      if (!IS_PROD) console.error(err);
      this.handleSendError();
    }
  };

  connect(): Promise<boolean> {
    store.dispatch(sessionSlice.actions.dang_reset());
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
        this.ws = new WebSocket(API_URL);
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

  /* / MAINTAIN CONNECTION */

  /* OBEY THE SERVER */
  private obeyTheServer = (e: MessageEvent) => {
    try {
      const parsed = JSON.parse(e.data);
      const purified = purify(parsed);

      if (!IS_PROD) console.log(`received msg, cipher:`, purified);

      if ('cipher' in purified) {
        if (
          !this.controlKey ||
          (purified as SCMsg).sessionId !== this.controlKey
        ) {
          throw new Error('msg session Id !== controlKey!');
        }
        switch ((purified as SCMsg).cipher) {
          case SCMSG_CIPHERS.CONN_TO_SESS_STATUS:
            this.handleSCMsgConnToSessStatus(purified as SCMsgConnToSessStatus);

            return;
          case CSMSG_CIPHERS.CHAT_MSG:
            this.handleSCMsgChatMsg(purified as SCMsgChatMsgsChanged);

            return;

          case SCMSG_CIPHERS.UPDATE_SESSION_STATE:
            this.handleSCMsgUpdateState(purified as CSMsgUpdateState);

            return;

          case SCMSG_CIPHERS.NEW_CONNECTION:
            this.handleSCMsgNewConnection(purified as SCMsgNewConnection);

            return;

          case SCMSG_CIPHERS.MEMBERS_CHANGED:
            this.handleSCMsgMembersChanged(purified as SCMsgMembersChanged);

            return;

          case SCMSG_CIPHERS.FORCE_KICK:
            // TODO (no95typem) showToast?
            return;

          case SCMSG_CIPHERS.VOTEKICK:
            this.handleVotekick(purified as SCMsgVotekick);

            return;

          case SCMSG_CIPHERS.YOU_WERE_KICKED:
            this.handleCSMsgYouWereKicked();

            return;

          default:
            // just ignore
            return;
        }
      }
    } catch (err) {
      console.error(err);
      // TODO (no95typem)
    }
  };

  private handleVotekick = (msg: SCMsgVotekick) => {
    const { targetId, initId } = msg.body;

    showKickDialog(targetId, initId);
  };

  private handleCSMsgYouWereKicked() {
    const { stage } = store.getState().session;

    if (stage === SESSION_STAGES.GAME || stage === SESSION_STAGES.LOBBY) {
      this.updSessState({ stage: SESSION_STAGES.STATS });
    }

    const notification: INotification = {
      status: 'error',
      text: 'You were kicked!',
      needToShow: true,
    };

    store.dispatch(addNotifRec(notification));
  }

  private handleSCMsgNewConnection(msg: SCMsgNewConnection) {
    const state = store.getState();

    const isExist = Object.values(state.alerts).some(
      val =>
        val.specialType === 'new-connection' &&
        val.addData?.userSessionPublicId === msg.m.userSessionPublicId,
    );

    if (isExist) return;

    const notification: INotification = {
      specialType: 'new-connection',
      status: 'info',
      text: '',
      needToShow: true,
      addData: msg.m,
    };
    store.dispatch(addNotifRec(notification));
  }

  private handleSCMsgUpdateState(msg: CSMsgUpdateState) {
    if (msg.update.stage) {
      store.dispatch(removeLoad(KNOWN_LOADS_KEYS.SESSION_STAGE_CHANGE));
    }

    if (msg.update.game) {
      const { game } = store.getState().session;

      if (
        game?.roundState !== ROUND_STATES.IN_PROCESS &&
        msg.update.game.roundState === ROUND_STATES.IN_PROCESS
      ) {
        msg.update.game.roundStartTime = Date.now();
      } else if (game && msg.update.game.roundStartTime) {
        msg.update.game.roundStartTime = game.roundStartTime;
      }
    }

    store.dispatch(
      sessionSlice.actions.dang_updSessStateFromServer(msg.update),
    );
  }

  private handleSCMsgConnToSessStatus(msg: SCMsgConnToSessStatus) {
    store.dispatch(removeLoad(KNOWN_LOADS_KEYS.CONNECTING_TO_LOBBY));
    store.dispatch(removeLoad(KNOWN_LOADS_KEYS.AWAITING_ADMISSION));

    if (msg.response.wait) {
      this.controlKey = msg.response.wait.sessId;
      // document.cookie = `lastToken=${msg.response.wait.token}; Path=/;`; // ! TODO (no95typem) expires ?
      this.lastToken = msg.response.wait.token;

      store.dispatch(
        setGLoadByKey({
          loadKey: KNOWN_LOADS_KEYS.AWAITING_ADMISSION,
          disableWatchdog: true,
        }),
      );
    }

    if (msg.response.fail) {
      const errorKey: KnownErrorsKey =
        msg.response.fail.reason || KNOWN_ERRORS_KEYS.SC_PROTOCOL_ERROR;
      store.dispatch(setErrorByKey(errorKey));
    }

    if (msg.response.success) {
      store.dispatch(
        sessionSlice.actions.dang_updSessStateFromServer({
          ...msg.response.success.state,
          clientId: msg.response.success.yourId,
        }),
      );

      if (msg.response.success.yourId === DEALER_ID) {
        this.sendSettings(true);
      }
    }
  }

  private handleSCMsgMembersChanged(msg: SCMsgMembersChanged) {
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

    store.dispatch(
      sessionSlice.actions.dang_updSessStateFromServer({ members: newMembers }),
    );
  }

  private handleSCMsgChatMsg(msg: SCMsgChatMsgsChanged) {
    const state = store.getState();

    const chat = OBJ_PROCESSOR.deepClone(state.session.chat);

    const { isVisible: isChatVisible } = state.chat;

    const { command, update } = msg.body;

    switch (command) {
      case 'A':
        const chatMsgs = Object.values(update);

        chatMsgs.forEach(chatMsg => {
          chatMsg.isViewed = isChatVisible;
        });

        chatMsgs.forEach(chatMsg => {
          if (
            chatMsg.clientTime &&
            state.session.clientId === chatMsg.memberId
          ) {
            chatMsg.isViewed = true;
            delete chat.msgs[`${chatMsg.clientTime}-${chatMsg.memberId}`];
          }
        });

        Object.assign(chat.msgs, update);
        chatSound(update);
        break;
      case 'D':
        Object.keys(update).forEach(key => delete chat.msgs[key]);
        break;
      default:
        break;
    }
    store.dispatch(sessionSlice.actions.dang_updSessStateFromServer({ chat }));
  }
  /* / OBEY THE SERVER */

  /* ACTIONS */
  connToLobby = () => {
    const state = store.getState();

    const url = state.homePage.lobbyURL;

    if (!url) {
      const notification: INotification = {
        status: 'error',
        text: 'Enter lobby id first!',
        needToShow: true,
      };

      store.dispatch(addNotifRec(notification));

      return;
    }

    this.controlKey = url;

    const token = this.lastToken; //|| getCookieValByName('lastToken');

    const msg = new CSMsgConnToSess({
      info: state.userInfo,
      role: state.homePage.lastUserRole,
      sessId: state.homePage.lobbyURL,
      token,
    });

    this.send(msg);

    store.dispatch(
      setGLoadByKey({
        loadKey: KNOWN_LOADS_KEYS.CONNECTING_TO_LOBBY,
        errorKey: KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER,
      }),
    );
  };

  createSess = () => {
    const state = store.getState();

    this.controlKey = genUniqId();

    const msg = new CSMsgCreateSession({
      controlKey: this.controlKey,
      userInfo: state.userInfo,
      settings: state.session.gSettings,
    });

    this.send(msg);
    store.dispatch(
      setGLoadByKey({
        loadKey: KNOWN_LOADS_KEYS.CONNECTING_TO_LOBBY,
        errorKey: KNOWN_ERRORS_KEYS.NO_CONNECTION_TO_SERVER,
      }),
    );
  };

  respondToNewConnection = (id: number, allow: boolean) => {
    const msg = new CSMSGNewConnectionResponse(id, allow);

    this.send(msg);
  };

  startGame = () => {
    const settings = store.getState().settings;

    if (settings.cards.length < 2) {
      const notification: INotification = {
        status: 'error',
        text: 'Create at least two cards to start the game!',
        needToShow: true,
      };

      store.dispatch(addNotifRec(notification));

      return;
    }

    const clonedSettings = OBJ_PROCESSOR.deepClone(settings);

    this.updSessState({ gSettings: clonedSettings });
    store.dispatch(
      setGLoadByKey({
        loadKey: KNOWN_LOADS_KEYS.SESSION_STAGE_CHANGE,
      }),
    );

    const msg = new CSMsgStartGame();

    this.send(msg);
  };

  exitGame = (skipDispatch?: true) => {
    if (skipDispatch !== true) {
      const state = store.getState();

      if (
        state.session.clientId === DEALER_ID &&
        state.session.stage === SESSION_STAGES.LOBBY
      ) {
        const notification: INotification = {
          status: 'success',
          text: 'Game was cancelled successfully.',
          needToShow: true,
        };

        store.dispatch(addNotifRec(notification));
      }

      store.dispatch(
        sessionSlice.actions.dang_updSessStateFromServer({
          stage: SESSION_STAGES.STATS,
        }),
      );
    }

    this.controlKey = undefined;

    const msg = new CSMsgDisconFromSess();

    this.send(msg);
  };

  endGame = () => {
    store.dispatch(
      setGLoadByKey({
        loadKey: KNOWN_LOADS_KEYS.SESSION_STAGE_CHANGE,
      }),
    );

    const endGame = new CSMsgEndGame();

    this.send(endGame);
  };

  sendSettings = (onlyAdmit?: true, specSettings?: ISettings) => {
    const settings = specSettings || store.getState().settings;
    // we should send this flag on the server
    // but it will be good if we
    // remove unnecesarry things on this satge

    const settingsToSend: ISettings = onlyAdmit
      ? OBJ_PROCESSOR.deepClone({
          ...settings,
          cardbacksBase64: undefined,
          cards: [],
          activeCardbackBase64: '',
        })
      : OBJ_PROCESSOR.deepClone({ ...settings, cardbacksBase64: undefined });

    this.updSessState({ gSettings: settingsToSend });
  };

  tryKick = (args: IKickArgs) => {
    const { targetId, decision, initId } = args;

    const state = store.getState();

    if (targetId === state.session.clientId || targetId === DEALER_ID) return;

    const isUserDealer = state.session.clientId === DEALER_ID;

    const force = !initId && isUserDealer;

    const msg = force
      ? new CSMsgForceKick(targetId)
      : new CSMsgVotekick({
          target: targetId,
          decision,
          isAnswer: !!(initId !== undefined),
        });

    const members = OBJ_PROCESSOR.deepClone(state.session.members);

    if (decision === true && force) {
      if (isUserDealer) members[targetId].userState = USER_STATES.KICKED;

      members[targetId].isSynced = false;

      store.dispatch(
        sessionSlice.actions.dang_updSessStateFromClient({ members }),
      );
    }

    this.send(msg);
  };

  sendChatMsg = (text: string) => {
    const state = store.getState();

    const memberId = state.session.clientId;

    if (memberId === undefined) return false;

    const time = Date.now();

    const chat = OBJ_PROCESSOR.deepClone(state.session.chat);

    const chatMsg: ChatMsg = {
      memberId,
      text,
      time,
      isSynced: false,
    };

    const msg = new CSMsgChatMsg(chatMsg);
    this.send(msg);

    chatMsg.isViewed = true;

    chat.msgs[`${time}-${memberId}`] = chatMsg;

    store.dispatch(sessionSlice.actions.dang_updSessStateFromClient({ chat }));
  };

  updSessState = (update: Partial<SessionState>) => {
    const synced = setSynced(update, false);

    const msg = new CSMsgUpdateState(update);

    this.send(msg);

    store.dispatch(sessionSlice.actions.dang_updSessStateFromClient(synced));
  };

  pickCard = (val: string | undefined) => {
    const msg = new CSMsgPick(val);

    this.send(msg);
  };

  startRound = () => {
    const msg = new CSMsgStartRound();

    this.send(msg);
  };

  stopRound = () => {
    const msg = new CSMsgStopRound();

    this.send(msg);
  };

  nextIssue = () => {
    const msg = new CSMsgNextIssue();

    this.send(msg);
  };

  toggleResultsVisibility = () => {
    const state = store.getState();

    if (state.session.game) {
      const msg = new CSMSgToggleResultsVisibility(
        !state.session.game.isResultsVisible,
      );

      this.send(msg);
    }
  };

  /* / ACTIONS */
}

export const SERVER_ADAPTER = new ServerAdapter();
