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

import { LOCALE_US } from '../../locales/locale-us';

export interface IKickModalProps {
  isOpen: boolean;
  initName?: string;
  targetMame: string;
  onClose: () => void;
  onConfirm: () => void;
}

const KickModal = (props: IKickModalProps): JSX.Element => {
  const { isOpen, onClose, targetMame: name, onConfirm, initName } = props;

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl" textAlign="center">
            {initName ? 'Kick' : ' Kick Player?'}
          </ModalHeader>

          <ModalBody mb="20px">
            <Text textAlign="center">
              {initName
                ? `${initName} want to kick ${name}. Do you agree with it?`
                : `${LOCALE_US.KICK_PLAYER_MODAL_TEXT_START} ${name} ${LOCALE_US.KICK_PLAYER_MODAL_TEXT_FINISH}`}
            </Text>
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
                onClick={onConfirm}
                padding="0 50px"
              >
                Yes
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default KickModal;
