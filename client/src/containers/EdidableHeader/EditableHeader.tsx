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
  Box,
} from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { ISessionNameHandling } from '../../../../shared/types/session/name';
import ChakraLoader from '../../components/Loader/ChakraLoader';
import { LockIcon } from '@chakra-ui/icons';
import { addNotifRec, INotification } from '../../redux/slices/notifications';
import { store } from '../../redux/store';

const EditableHeader = (props: ISessionNameHandling) => {
  const { name, changeValue, isPlayerDealer } = props;

  const { value, isSynced } = name;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [topicView, setTopicView] = useState(value);

  const updateTopic = (): void => {
    if (!topicView) {
      const notification: INotification = {
        status: 'error',
        text: `Session's name can't be empty!`,
        needToShow: true,
      };

      store.dispatch(addNotifRec(notification));

      return;
    }

    changeValue(topicView);

    onClose();
  };

  return (
    <Stack
      position="relative"
      w="100%"
      direction="row"
      justify="center"
      align="center"
      p="10px"
      opacity={isSynced ? 1 : 0.5}
    >
      <Box position="relative" maxW="80%" h="40px">
        <Heading size="md" w="100%" h="100%" lineHeight="40px" isTruncated>
          {value}
        </Heading>
        {isPlayerDealer && (
          <IconButton
            aria-label="edit"
            background="transparent"
            position="absolute"
            right="-40px"
            top="50%"
            style={{ transform: 'translateY(-50%)' }}
            size="sm"
            icon={isSynced ? <ImPencil /> : <LockIcon />}
            onClick={onOpen}
            opacity="0.6"
            _hover={{
              opacity: 1,
            }}
          />
        )}
      </Box>

      {!isSynced && <ChakraLoader />}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
              <EditableInput maxLength={30} />
            </Editable>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup w="100%" d="flex" justifyContent="space-between">
              <Button w="100px" variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                border="1px solid black"
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
