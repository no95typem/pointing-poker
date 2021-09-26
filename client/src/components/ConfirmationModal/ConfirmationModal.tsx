import React from 'react';

import {
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
} from '@chakra-ui/react';

import { IConfirmation } from '../../../../shared/types/session/state/session-state';

const ConfirmationModal = (props: IConfirmation): JSX.Element => {
  const { confirmData, isOpen, onClose } = props;

  const { description, action } = confirmData;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Action:</ModalHeader>

        <ModalBody mb="20px">
          <Text>{`Do you really want to ${description}?`}</Text>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup
            colorScheme="facebook"
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Button padding="0 50px" variant="outline" onClick={onClose}>
              No
            </Button>
            <Button padding="0 50px" onClick={action}>
              Yes
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
