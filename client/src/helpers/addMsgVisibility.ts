import { ChatMsg } from '../../../shared/types/session/chat/chat-msg';

export const addMsgVisibility = (
  update: Record<string, ChatMsg>,
  isVisible: boolean,
) => {
  if (isVisible) {
    changeValueNestedObject(update, true);
  } else {
    changeValueNestedObject(update, false);
  }
};

const changeValueNestedObject = (
  update: Record<string, ChatMsg>,
  visibility: boolean,
) => {
  Object.entries(update).forEach(([key, msg]) =>
    Object.assign(update, {
      [key]: Object.assign(msg, (msg.isViewed = visibility)),
    }),
  );
};
