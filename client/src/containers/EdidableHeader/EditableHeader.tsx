import React, { useState } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Stack,
  Heading,
  ButtonGroup,
} from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { ISessionNameHandling } from '../../../../shared/types/session/name';

const EditableHeader = (props: ISessionNameHandling) => {
  const { value, changeValue, isPlayerDealer } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [topicView, setTopicView] = useState(value);

  const updateTopic = (): void => {
    changeValue(topicView);

    onClose();
  };

  return (
    <Stack w="100%" direction="row" justify="center" align="center" p="10px">
      <Heading size="lg" maxW="300px" isTruncated>
        {value}
      </Heading>

      <IconButton
        top="0"
        right="0"
        aria-label="edit"
        background="transparent"
        visibility={isPlayerDealer ? 'visible' : 'hidden'}
        size="lg"
        icon={<ImPencil />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Topic:</ModalHeader>
          <ModalBody>
            <Editable
              value={topicView}
              textAlign="center"
              startWithEditView={true}
              onChange={setTopicView}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup w="100%" d="flex" justifyContent="space-between">
              <Button
                colorScheme="facebook"
                w="100px"
                variant="outline"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                colorScheme="facebook"
                w="100px"
                variant="solid"
                onClick={updateTopic}
              >
                Change
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default EditableHeader;
