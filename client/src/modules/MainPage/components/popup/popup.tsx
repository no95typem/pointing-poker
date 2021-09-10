import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
} from '@chakra-ui/react';
import RadioButtons from '../radio-buttons/radio-buttons';
import InputsStack from '../inputs-stack/inputs-stack';
import AvatarForm from '../avatar-form/avatar-form';
import { userInfoSlice } from '../../../../redux/slices/userInfo';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const Popup = ({ isOpen, close }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const {
    changeName,
    changeSurname,
    changeJobPosition,
    changeAvatarBase64,
    changeAvatarBgColor,
  } = userInfoSlice.actions;

  const clearForm = (): void => {
    dispatch(changeName(''));
    dispatch(changeSurname(''));
    dispatch(changeJobPosition(''));
    dispatch(changeAvatarBase64(''));
    dispatch(changeAvatarBgColor('#385898'));
  };

  const clickButtonClose = () => {
    close();
    clearForm();
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={close}
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
            <RadioButtons />
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
