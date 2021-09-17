import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import MainPage from './components/main-page/main-page';
import ConnectPopup from './components/popup/popup';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { UserRole } from '../../../../shared/types/user/user-role';
import { useAppDispatch } from '../../redux/store';
import { sessionSlice } from '../../redux/slices/session';

const HomePage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dealer, setDealer] = useState(false);

  const onPopupCall = (forRole: UserRole) => {
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
      <MainPage onPopupCalled={onPopupCall} />
      <ConnectPopup isOpen={isOpen} onClose={onClose} forDealer={dealer} />
    </>
  );
};

export default HomePage;
