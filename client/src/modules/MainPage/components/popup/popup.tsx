import React, { useState } from 'react';
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

interface Props {
  isOpen: boolean;
  close: () => void;
}

const Popup = ({ isOpen, close }: Props): JSX.Element => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    jobPosition: '',
  });

  const userChange = (name: string, value: string): void => {
    setUser({ ...user, [name]: value });
  };

  const clearForm = (): void => {
    setUser({
      firstName: '',
      lastName: '',
      jobPosition: '',
    });
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
              <InputsStack user={user} userChange={userChange} />
              <AvatarForm user={user} />
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
