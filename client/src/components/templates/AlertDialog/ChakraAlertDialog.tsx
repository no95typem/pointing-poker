import React, { useRef } from 'react';

import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { LocaleText } from '../../../locale';

const ChakraAlertDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef(null);

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Kick Player
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Kick Player?
            </AlertDialogHeader>

            <AlertDialogBody>{LocaleText.REMOVE_PLAYER}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ChakraAlertDialog;
