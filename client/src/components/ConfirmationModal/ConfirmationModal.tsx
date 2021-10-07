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
  Flex,
} from '@chakra-ui/react';

import { IConfirmation } from '../../../../shared/types/session/state/session-state';
import { ReactComponent as UndrawConfirmation } from '../../assets/images/undraw/confirmation.svg';

const ConfirmationModal = (props: IConfirmation): JSX.Element => {
  const { confirmData, isOpen, onClose } = props;

  const { description, action } = confirmData;

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontFamily="handwrite">
          Confirm Action
        </ModalHeader>

        <ModalBody>
          <Flex gridGap={8} direction="column" align="center">
            <Text
              fontSize="lg"
              fontFamily="handwrite"
            >{`Do you really want to ${description}?`}</Text>
            <UndrawConfirmation style={{ width: '50%' }} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Button padding="0 50px" variant="outline" onClick={onClose}>
              No
            </Button>
            <Button
              border="1px solid black"
              padding="0 50px"
              onClick={() => {
                onClose();
                action();
              }}
            >
              Yes
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
