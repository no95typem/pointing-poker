import { store } from '../redux/store';
import { sessionSlice } from '../redux/slices/session';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';

export const readMsgs = (): void => {
  const state = store.getState();
  const { isVisible } = state.chat;
  const chat = OBJ_PROCESSOR.deepClone(state.session.chat);
  const { msgs } = chat;

  if (isVisible) {
    Object.entries(msgs).forEach(([key, msg]) => {
      Object.assign(msgs, { [key]: Object.assign(msg, { isViewed: true }) });
    });
    Object.assign(chat, msgs);
    store.dispatch(sessionSlice.actions.dang_updSessStateFromServer({ chat }));
  }
};
