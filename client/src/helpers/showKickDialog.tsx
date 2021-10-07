import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import { theme } from '../theme';
import KickModal, { IKickModalProps } from '../components/KickModal/KickModal';
import { RootState, store } from '../redux/store';
import { Member } from '../../../shared/types/session/member';
import { SERVER_ADAPTER } from '../modules/ServerAdapter/serverAdapter';

const calcNameStrFromMember = (m: Member) => {
  const { name, surname } = m.userInfo;

  return surname ? `${name} ${surname}` : name;
};

export const showKickDialog = (targetId: number, initId?: number) => {
  const div = document.createElement('div');

  const remove = () => {
    ReactDOM.render(<></>, div);
    div.remove();
  };

  const state = store.getState() as RootState;

  const initMember =
    initId !== undefined ? state.session.members[initId] : undefined;
  const targetMemeber = state.session.members[targetId] || undefined;

  const initMemberName = initMember
    ? calcNameStrFromMember(initMember)
    : undefined;
  const targetMemeberName = targetMemeber
    ? calcNameStrFromMember(targetMemeber)
    : '';

  const modalData: IKickModalProps = {
    onClose: () => {
      if (initId) {
        SERVER_ADAPTER.tryKick({
          targetId,
          decision: false,
          initId,
        });
      }
      remove();
    },
    onConfirm: () => {
      SERVER_ADAPTER.tryKick({
        targetId,
        decision: true,
        initId,
      });
      remove();
    },
    targetMame: targetMemeberName,
    initName: initMemberName,
    isOpen: true,
  };

  ReactDOM.render(
    <ChakraProvider theme={theme}>
      <KickModal {...modalData} />
    </ChakraProvider>,
    div,
  );

  document.body.append(div);
};
