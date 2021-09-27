import { OBJ_PROCESSOR } from './helpers/processors/obj-processor';
import { CardData } from './types/session/card';
import { Member } from './types/session/member';
import {
  ISessionStateClient,
  SessionState,
} from './types/session/state/session-state';
import { ISettings } from './types/settings';
import { USER_ROLES } from './types/user/user-role';

const testCardsData: CardData[] = [
  //тестовый объект, отладка
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: 'Unknown', base64: '<img>' },
];

export const defaultSettings: ISettings = {
  isAutoAdmit: false,
  isDealerPlayer: true,
  isCardShownOnRoundEnd: false,
  isPlayerCanReselectCard: true,
  isTimerNeeded: true,
  scoreType: 'story points',
  scoreTypeShort: 'SP',
  roundTime: 15000,
  cards: testCardsData, //placeholder
  cardBackType: '',
};

const SESSION_INIT_STATE: SessionState = {
  sessionId: '',
  stage: 'LOBBY',
  name: { value: 'unnamed pp session', isSynced: true },
  members: {},
  gSettings: defaultSettings,
  chat: {
    msgs: {},
  },
  issues: {
    isSynced: true,
    list: [],
  },
};

export const CREATE_INIT_STATE = () =>
  OBJ_PROCESSOR.deepClone(SESSION_INIT_STATE);

export const SESSION_CLIENT_INIT_STATE: ISessionStateClient = {
  ...SESSION_INIT_STATE,
  clientId: undefined,
  stage: 'EMPTY',
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
  clientId: 0,
  name: { value: 'Session 12345', isSynced: false },
  stage: 'LOBBY',
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
  },
  gSettings: defaultSettings,
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
    list: [],
    isSynced: true,
  },
};
