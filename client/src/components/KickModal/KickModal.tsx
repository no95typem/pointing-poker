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

import { IKickModalBundle } from '../../../../shared/types/session/member';

const KickModal = (props: IKickModalBundle): JSX.Element => {
  const { modalData } = props;

  const { isOpen, onClose, name, onConfirm, initiatorName } = modalData;

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
                : `${LOCALE_US.KICK_PLAYER_MODAL_TEXT_START} ${name} ${LOCALE_US.KICK_PLAYER_MODAL_TEXT_FINISH}`}
            </Text>
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
              <Button onClick={onConfirm} padding="0 50px">
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
