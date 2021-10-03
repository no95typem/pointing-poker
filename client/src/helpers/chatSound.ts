import { store } from '../redux/store';
import { audioPlay } from './audioPlay';
import { IMemberData, Member } from '../../../shared/types/session/member';
import { ChatMsg } from '../../../shared/types/session/chat/chat-msg';
import message_sound from '../assets/sounds/message_sound.wav';

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

  msgEntries.forEach(([key, msg]) => {
    const memberData = setMemberData(sessionData.members[msg.memberId]);

    if (!isVisible && !memberData.isItYou && !isMute) {
      audioPlay(message_sound);
    }
  });
};
