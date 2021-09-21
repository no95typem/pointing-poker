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
  FormControl,
} from '@chakra-ui/react';
import UserInfoInputStack from '../../containers/UserInfoInputStack/UserInfoInputStack';
import AvatarForm from '../../containers/AvatarForm/AvatarForm';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { connectToLobby, createSession } from '../../redux/slices/connect';
import UserRoleRadioButtons from '../../containers/UserRoleRadioButtons/UserRoleRadioButtons';
import { ChangeEvent } from 'react';
import { userInfoSlice } from '../../redux/slices/userInfo';

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
  const userInfo = useTypedSelector(state => state.userInfo);
  const isNameInvalid = userInfo.name.length === 0;

  const handleUserInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return dispatch(userInfoSlice.actions.changeName(value));
      case 'surname':
        return dispatch(userInfoSlice.actions.changeSurname(value));
      case 'jobPosition':
        return dispatch(userInfoSlice.actions.changeJobPosition(value));
      default:
        return;
    }
  };

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
          <FormControl isInvalid={true}>
            <Flex direction="column" alignItems="center" gridGap="5rem">
              <Flex w="100%" justify="space-between">
                <UserInfoInputStack
                  {...{
                    ...userInfo,
                    isNameInvalid,
                    onChange: handleUserInfoChange,
                  }}
                />
                <AvatarForm />
              </Flex>
              {forDealer ? (
                <Text size="2xl">You will be a dealer</Text>
              ) : (
                <UserRoleRadioButtons />
              )}
            </Flex>
          </FormControl>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button colorScheme="facebook" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="facebook"
            disabled={isNameInvalid}
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
