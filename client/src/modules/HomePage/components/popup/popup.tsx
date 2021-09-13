import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import RadioButtons from '../radio-buttons/radio-buttons';
import InputsStack from '../inputs-stack/inputs-stack';
import AvatarForm from '../avatar-form/avatar-form';
import { useAppDispatch } from '../../../../redux/store';
import {
  changeName,
  changeSurname,
  changeJobPosition,
  changeAvatarBase64,
  changeAvatarBgColor,
} from '../../../../redux/slices/userInfo';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  forDealer: boolean;
}

const Popup = ({ isOpen, onClose, forDealer }: PopupProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const clearForm = (): void => {
    dispatch(changeName(''));
    dispatch(changeSurname(''));
    dispatch(changeJobPosition(''));
    dispatch(changeAvatarBase64(''));
    dispatch(changeAvatarBgColor('#385898'));
  };

  const clickButtonClose = () => {
    onClose();
    clearForm();
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      onOverlayClick={clearForm}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect to lobby</ModalHeader>
        <ModalBody>
          <Flex direction="column" alignItems="center" gridGap="5rem">
            <Flex w="100%" justify="space-between">
              <InputsStack />
              <AvatarForm />
            </Flex>
            {forDealer ? (
              <Text>Welcome, You will be a dealer</Text>
            ) : (
              <RadioButtons />
            )}
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button
            colorScheme="facebook"
            variant="outline"
            onClick={clickButtonClose}
          >
            Close
          </Button>
          <Button colorScheme="facebook">Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
