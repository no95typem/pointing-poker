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

interface ICardsSetData {
  modal: ICardsSetModal;
  showPlaceholder: () => void;
}

const GameCardsSetModal = (props: ICardsSetData): JSX.Element => {
  const { modal, showPlaceholder } = props;

  const { isSetModalOpen, onSetModalClose, setCardsSet } = modal;

  const [value, setValue] = useState('');

  const addSet = (): void => {
    setCardsSet(value);

    showPlaceholder();

    setValue('');
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isSetModalOpen}
      isCentered
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
            <Button border="1px solid black" padding="0 50px" onClick={addSet}>
              Create
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameCardsSetModal;
