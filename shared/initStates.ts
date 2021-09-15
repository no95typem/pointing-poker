import { OBJ_PROCESSOR } from './helpers/processors/obj-processor';
import { CardData } from './types/session/card';
import { Member } from './types/session/member';
import {
  ISessionStateClient,
  SessionState,
} from './types/session/state/session-state';
import { ISettings } from './types/settings';
import { USER_ROLES } from './types/user/user-role';

const testCardsData: Record<string, CardData> = {
  //тестовый объект, отладка
  unknown: { value: 'unknown' },
  '1': { value: '1' },
  '2': { value: '2' },
  '3': { value: '3' },
};

const defaultSettings: ISettings = {
  dealerAsPlayer: true,
  changingCardInRoundEnd: false,
  isTimerNeeded: true,
  scoreType: 'story points',
  scoreTypeShort: 'SP',
  roundTime: 140,
  cards: testCardsData, //placeholder
  cardBackType: '',
};

const SESSION_INIT_STATE: SessionState = {
  sessionId: '',
  stage: 'LOBBY',
  name: { value: 'unnamed pp session', isSynced: true },
  members: {},
  currentGameSettings: defaultSettings,
  chat: {
    isVisible: false,
    msgs: {},
    typedText: '',
  },
  issues: [],
};

export const CREATE_INIT_STATE = () =>
  OBJ_PROCESSOR.deepClone(SESSION_INIT_STATE);

export const SESSION_CLIENT_INIT_STATE: ISessionStateClient = {
  ...SESSION_INIT_STATE,
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
        surname: 'Riz',
        avatarBgColor: 'black',
      },
      userRole: 'PLAYER',
      userSessionPublicId: 2,
    },
  },
  currentGameSettings: defaultSettings,
  chat: {
    isVisible: false,
    msgs: {},
    typedText: '',
  },
  issues: [],
};
