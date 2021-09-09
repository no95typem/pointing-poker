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
import { LocaleText } from '../../locale';

interface IKick {
  isOpen: boolean;
  initiatorName?: string;
  name: string;

  onClose: () => void;
  onConfirm: () => void;
}

const KickModal = (props: IKick): JSX.Element => {
  const { isOpen, onClose, name, onConfirm, initiatorName } = props;

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl" textAlign="center">
            {initiatorName ? 'Kick' : ' Kick Player?'}
          </ModalHeader>

          <ModalBody mb="20px">
            <Text textAlign="center">
              {initiatorName
                ? `${initiatorName} want to kick ${name}. Do you agree with it?`
                : `${LocaleText.KICK_PLAYER_MODAL_TEXT_START} ${name} ${LocaleText.KICK_PLAYER_MODAL_TEXT_FINISH}`}
            </Text>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup
              colorScheme="facebook"
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Button onClick={onConfirm} padding="0 50px">
                Yes
              </Button>
              <Button padding="0 50px" variant="outline" onClick={onClose}>
                No
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default KickModal;
