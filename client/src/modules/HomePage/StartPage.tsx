import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import StartPageContent from '../../containers/StartPageContent/StartPageContent';
import ConnectPopup from '../ConnectPopup/ConnectPopup';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { UserRole } from '../../../../shared/types/user/user-role';
import { useAppDispatch } from '../../redux/store';
import { sessionSlice } from '../../redux/slices/session';

const StartPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dealer, setDealer] = useState(false);

  const onConnectPopupCall = (forRole: UserRole) => {
    if (forRole === USER_ROLES.DEALER) {
      setDealer(true);
      onOpen();
    } else {
      setDealer(false);
      onOpen();
    }
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(sessionSlice.actions.dang_reset());
  }, [dispatch]);

  return (
    <>
      <StartPageContent onPopupCalled={onConnectPopupCall} />
      <ConnectPopup isOpen={isOpen} onClose={onClose} forDealer={dealer} />
    </>
  );
};

export default StartPage;
