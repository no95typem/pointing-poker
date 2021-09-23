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
  FormLabel,
  Box,
  useMediaQuery,
} from '@chakra-ui/react';
import UserInfoInputStack from '../../containers/UserInfoInputStack/UserInfoInputStack';
import AvatarForm from '../../containers/AvatarForm/AvatarForm';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { connectToLobby, createSession } from '../../redux/slices/connect';
import UserRoleRadioButtons from '../../containers/UserRoleRadioButtons/UserRoleRadioButtons';
import { ChangeEvent } from 'react';
import { userInfoSlice } from '../../redux/slices/userInfo';
import { ReactComponent as UndrawBusinessDecisions } from '../../assets/images/undraw/business-decisions.svg';
import { ReactComponent as UndrawSelectPlayer } from '../../assets/images/undraw/select-player.svg';

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
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');

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
      size="3xl"
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      onOverlayClick={onClose}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="handwrite">
          Setting up your new participating
        </ModalHeader>
        <ModalBody>
          <Flex direction="column" alignItems="center" w="100%" gridGap="6">
            <Flex
              w="100%"
              justify="center"
              wrap="wrap"
              gridGap="6"
              alignItems="center"
            >
              <Box>
                <FormLabel fontFamily="handwrite">
                  1. Enter or check your user information:
                </FormLabel>
                <UserInfoInputStack
                  {...{
                    ...userInfo,
                    isNameInvalid,
                    onChange: handleUserInfoChange,
                  }}
                />
              </Box>
              <Box>
                <FormLabel fontFamily="handwrite">
                  2. Setup your avatar (optional):
                </FormLabel>
                <AvatarForm />
              </Box>
            </Flex>
            <Box mt={isLargerThan640 ? '4' : undefined}>
              <FormLabel fontFamily="handwrite">
                3. Check your role for this session:
              </FormLabel>
              {forDealer ? (
                <Flex alignItems="center">
                  <Text fontFamily="handwrite" fontWeight="bold">
                    You will be a dealer!
                  </Text>
                  <UndrawBusinessDecisions width="70%" />
                </Flex>
              ) : (
                <Flex alignItems="center" wrap="wrap" position="relative">
                  <Box
                    position="absolute"
                    top="5px"
                    p={1}
                    backgroundBlendMode="color-burn"
                  >
                    <UserRoleRadioButtons />
                  </Box>
                  <UndrawSelectPlayer />
                </Flex>
              )}
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
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
