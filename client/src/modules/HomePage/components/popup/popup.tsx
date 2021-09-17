import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import RadioButtons from '../radio-buttons/radio-buttons';
import InputsStack from '../inputs-stack/inputs-stack';
import AvatarForm from '../avatar-form/avatar-form';
import { useAppDispatch } from '../../../../redux/store';
import {
  connectToLobby,
  createSession,
} from '../../../../redux/slices/connect';

interface ConnectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  forDealer: boolean;
}

const ConnectPopup = ({
  isOpen,
  onClose,
  forDealer,
}: ConnectPopupProps): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      onOverlayClick={onClose}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect to lobby</ModalHeader>
        <ModalBody>
          <Flex direction="column" alignItems="center" gridGap="5rem">
            <Flex w="100%" justify="space-between">
              <InputsStack />
              <AvatarForm />
            </Flex>
            {forDealer ? (
              <Text size="2xl">You will be a dealer</Text>
            ) : (
              <RadioButtons />
            )}
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button colorScheme="facebook" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="facebook"
            onClick={() =>
              forDealer ? dispatch(createSession()) : dispatch(connectToLobby())
            }
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectPopup;
