import { CardData } from './types/session/card';
import { Member } from './types/session/member';
import {
  ISessionStateClient,
  SessionState,
} from './types/session/state/session-state';
import { Settings } from './types/settings';

const testCardsData: Record<string, CardData> = {
  //тестовый объект, отладка
  unknown: { value: 'unknown' },
  '1': { value: '1' },
  '2': { value: '2' },
  '3': { value: '3' },
};

const defaultSettings: Settings = {
  dealerAsPlayer: true,
  changingCardInRoundEnd: false,
  isTimerNeeded: true,
  scoreType: 'story points',
  scoreTypeShort: 'SP',
  cards: testCardsData, //placeholder
  cardBackType: '',
};

export const SESSION_INIT_STATE: SessionState = {
  sessionId: '',
  stage: 'EMPTY',
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

//Временные переменые, исключительно для отладки.

const sampleMember: Member = {
  userInfo: {
    name: 'John',
    surname: 'Smith',
    jobPosition: 'senior',
    avatarBgColor: 'green',
  },
  userSessionPublicId: 0,
  userRole: 'DEALER',
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
