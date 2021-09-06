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
  useDisclosure,
  Select,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const ChakraModal = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Create Issue</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Issue</ModalHeader>

          <ModalBody mb="20px">
            <Stack>
              <FormControl id="title" isRequired>
                <Stack spacing={2} direction="row" align="center">
                  <FormLabel>Title:</FormLabel>
                  <Input placeholder="Issue name" />
                </Stack>
              </FormControl>
              <Stack spacing={2} direction="row" align="center">
                <FormLabel>Priority:</FormLabel>
                <Select variant="filled" bg="gray.100">
                  <option value="low">Low</option>
                  <option value="middle">Middle</option>
                  <option value="high">High</option>
                </Select>
              </Stack>
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

export default ChakraModal;
