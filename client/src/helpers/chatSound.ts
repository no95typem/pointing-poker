import { store } from '../redux/store';
import { IMemberData, Member } from '../../../shared/types/session/member';
import { ChatMsg } from '../../../shared/types/session/chat/chat-msg';

import { SYSTEM_AUDIO } from './SystemAudio';

export const chatSound = (update: Record<string, ChatMsg>) => {
  const state = store.getState();

  const { isVisible } = state.chat;

  const sessionData = state.session;

  const msgEntries = Object.entries(update);

  const { isMute } = state.sound;

  const isItYou = (member: Member) => {
    return sessionData.clientId === member.userSessionPublicId;
  };

  const setMemberData = (member: Member): IMemberData => {
    return {
      member: member,
      isItYou: isItYou(member),
      isRoundStarted: false,
    };
  };

  msgEntries.forEach(([, msg]) => {
    const memberData = setMemberData(sessionData.members[msg.memberId]);

    if (!isVisible && !memberData.isItYou && !isMute) {
      SYSTEM_AUDIO.play('message');
    }
  });
};
