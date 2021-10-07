import { OBJ_PROCESSOR } from './helpers/processors/obj-processor';
import { Member } from './types/session/member';
import { ROUND_STATES } from './types/session/round/round-state';
import {
  ISessionStateClient,
  SessionState,
} from './types/session/state/session-state';
import { SESSION_STAGES } from './types/session/state/stages';
import { ISettings } from './types/settings';
import { USER_ROLES } from './types/user/user-role';

export const DEFAULT_SETTINGS_SHARED: ISettings = {
  isAutoAdmit: false,
  isDealerPlayer: true,
  isCardShownOnRoundEnd: true,
  isPlayerCanReselectCard: true,
  isTimerNeeded: true,
  scoreType: 'story points',
  scoreTypeShort: 'SP',
  roundTime: 25000,
  cards: [],
  activeCardbackBase64: '',
};

const SESSION_INIT_STATE: SessionState = {
  sessionId: '',
  stage: 'LOBBY',
  name: { value: 'unnamed pp session', isSynced: true },
  members: {},
  gSettings: DEFAULT_SETTINGS_SHARED,
  chat: {
    msgs: {},
  },
  issues: {
    isSynced: true,
    list: [],
  },
};

//Временные переменые, исключительно для отладки.

const sampleMember: Member = {
  userInfo: {
    name: 'John',
    surname: 'Smith',
    jobPosition: 'senior',
    avatarBgColor: 'green',
  },
  userSessionPublicId: 0,
  userRole: USER_ROLES.DEALER,
  userState: 'CONNECTED',
  isSynced: true,
};

export const SESSION_TESTING_STATE: ISessionStateClient = {
  sessionId: '12345',
  clientId: 1,
  name: { value: 'Session 12345', isSynced: true },
  stage: SESSION_STAGES.GAME,
  game: {
    currIssueId: 0,
    roundState: ROUND_STATES.IN_PROCESS,
    isResultsVisible: true,
    votes: {
      1: '1',
    },
  },
  members: {
    0: sampleMember,
    1: {
      ...sampleMember,
      userInfo: {
        ...sampleMember.userInfo,
        name: 'Alex',
        surname: 'Sandler',
        avatarBgColor: 'red',
      },
      userRole: 'PLAYER',
      userSessionPublicId: 1,
    },
    2: {
      ...sampleMember,
      userInfo: {
        ...sampleMember.userInfo,
        name: 'Kerri',
        surname: 'Rizzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        jobPosition: 'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',
        avatarBgColor: 'black',
      },
      userRole: 'PLAYER',
      userSessionPublicId: 2,
    },
    3: {
      ...sampleMember,
      userInfo: {
        ...sampleMember.userInfo,
        name: 'Vasya',
        surname: 'dddddddddddddddRRRRRRRRRRRRRRRRR',
        jobPosition: 'ZZzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        avatarBgColor: 'black',
      },
      userRole: 'PLAYER',
      userSessionPublicId: 2,
    },
    4: {
      ...sampleMember,
      userInfo: {
        ...sampleMember.userInfo,
        name: 'Vzzzzasya',
        surname: 'dddzzzzzzddddddddddddRRRRRRRRRRRRRRRRR',
        jobPosition: 'ZxxxZzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        avatarBgColor: 'black',
      },
      userRole: 'PLAYER',
      userSessionPublicId: 2,
    },
  },
  gSettings: DEFAULT_SETTINGS_SHARED,
  chat: {
    msgs: {
      0: {
        memberId: 0,
        text: 'hello! zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        time: Date.now(),
        isSynced: true,
      },
      1: { memberId: 1, text: 'hello!', time: Date.now(), isSynced: true },
      2: { memberId: 2, text: 'hello!', time: Date.now(), isSynced: true },
    },
  },
  issues: {
    list: [
      {
        id: 0,
        title:
          'title 1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
        link: 'link 1',
        closed: false,
        isSynced: true,
        priority: 'MEDIUM',
      },
      {
        id: 1,
        title: 'title 2',
        link: 'link 2',
        closed: false,
        isSynced: true,
        priority: 'MEDIUM',
      },
      {
        id: 2,
        title: 'title 3',
        link: 'link 3',
        closed: false,
        isSynced: true,
        priority: 'MEDIUM',
      },
      {
        id: 3,
        title: 'title 4',
        link: 'link 4',
        closed: true,
        isSynced: true,
        priority: 'MEDIUM',
      },
      {
        id: 4,
        title: `title 5fffffffffffffffffffffffffffffffffffffffffff
          ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`,
        link: 'link 5',
        closed: false,
        isSynced: true,
        priority: 'MEDIUM',
        value: '2',
        stat: {
          pct: {
            '1': { count: 2, ids: [0, 1] },
            '2': { count: 1, ids: [2] },
          },
          votes: {
            0: '1',
            1: '1',
            2: '2',
          },
        },
      },
      {
        id: 5,
        title: `title 6ffffffffffffffffffffffffffffffffffffffffffffff
          fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`,
        link: 'link 6',
        closed: true,
        isSynced: true,
        priority: 'MEDIUM',
        stat: {
          pct: {
            '1': { count: 2, ids: [0, 1] },
            '2': { count: 1, ids: [2] },
          },
          votes: {
            0: '1',
            1: '1',
            2: '2',
          },
        },
      },
      {
        id: 6,
        title: `title 7ffffffffffffffffffffffffffffffffffffffffffffffff
          fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`,
        link: 'link 7',
        closed: true,
        isSynced: true,
        priority: 'MEDIUM',
        stat: {
          pct: {
            '1': { count: 2, ids: [0, 1] },
            '2': { count: 1, ids: [2] },
          },
          votes: {
            0: '1',
            1: '1',
            2: '2',
          },
        },
      },
      {
        id: 7,
        title: `title 8fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffff`,
        link: 'link 8',
        closed: true,
        isSynced: true,
        priority: 'MEDIUM',
        stat: {
          pct: {
            '1': { count: 2, ids: [0, 1] },
            '2': { count: 1, ids: [2] },
          },
          votes: {
            0: '1',
            1: '1',
            2: '2',
          },
        },
      },
    ],
    // list: [],
    isSynced: true,
  },
  // issues: { list: [], isSynced: true }
};

export const CREATE_INIT_STATE = () =>
  OBJ_PROCESSOR.deepClone(SESSION_INIT_STATE);

export const SESSION_CLIENT_INIT_STATE: ISessionStateClient = {
  ...SESSION_INIT_STATE,
  clientId: undefined,
  stage: 'EMPTY',
  gSettings: {
    ...SESSION_INIT_STATE.gSettings,
  },
};
