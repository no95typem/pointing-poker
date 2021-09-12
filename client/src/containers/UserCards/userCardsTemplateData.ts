import { ConnectionData } from '../../../../shared/types/session/connection-data';
import { Member } from '../../../../shared/types/session/member';
import { UserInfo } from '../../../../shared/types/user/user-info';

const playerData: ConnectionData = {
  role: 'DEALER',
  userSessionPrivateId: '1',
  userSessionPublicId: 1,
};

const userCard1: UserInfo = {
  name: 'Dan',
  surname: 'Smith',
  avatarBgColor: 'rgb(0,200,100)',
  jobPosition: 'Senior developer',
};

const member1: Member = {
  userInfo: userCard1,
  userSessionPublicId: 1,
  userRole: 'DEALER',
  userState: 'CONNECTED',
  isSynced: true,
};

const userCard2: UserInfo = {
  name: 'Matt',
  surname: 'Rogers',
  avatarBgColor: 'rgb(200,200,100)',
  jobPosition: 'Junior developer',
};

const member2: Member = {
  userInfo: userCard2,
  userSessionPublicId: 2,
  userRole: 'PLAYER',
  userState: 'CONNECTED',
  isSynced: true,
};

export { playerData, member1, member2 };
