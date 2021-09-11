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
  Stack,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import { ICardModalData } from '../../../../shared/types/session/card';

const GameCardModal = (props: ICardModalData): JSX.Element => {
  const { card } = props;

  const { isOpen, onClose, editCard } = card;

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Issue</ModalHeader>

          <ModalBody mb="20px">
            <Stack d="flex" justify="space-around" align="stretch">
              <FormControl id="title" isRequired>
                <Stack spacing={2} direction="row" align="center">
                  <FormLabel>Card Value:</FormLabel>
                  <Input defaultValue={editCard ? editCard.value : ''} />
                </Stack>
              </FormControl>
              <FormControl id="link" isRequired>
                <Stack spacing={2} direction="row" align="center">
                  <FormLabel htmlFor="link">Units(short):</FormLabel>
                  <Input defaultValue={editCard ? editCard.base64 : ''} />
                </Stack>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup
              colorScheme="facebook"
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Button padding="0 50px">Yes</Button>
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

export default GameCardModal;
