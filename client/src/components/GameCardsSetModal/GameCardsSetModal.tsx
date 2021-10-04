import React, { useState } from 'react';

import {
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Stack,
  Input,
  Text,
} from '@chakra-ui/react';

import { ICardsSetModal } from '../../../../shared/types/session/card';

const GameCardsSetModal = (props: ICardsSetModal): JSX.Element => {
  const { isSetModalOpen, onSetModalClose, setCardsSet } = props;

  const [value, setValue] = useState('');

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isSetModalOpen}
      onClose={onSetModalClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add cards set</ModalHeader>

        <ModalBody mb="20px">
          <Stack justify="space-around" align="stretch">
            <Text>Add cards values, separating them via whitespace</Text>
            <Input value={value} onChange={e => setValue(e.target.value)} />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Button
              padding="0 50px"
              variant="outline"
              onClick={onSetModalClose}
            >
              Cancel
            </Button>
            <Button
              border="1px solid black"
              padding="0 50px"
              onClick={() => setCardsSet(value)}
            >
              Create
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameCardsSetModal;
