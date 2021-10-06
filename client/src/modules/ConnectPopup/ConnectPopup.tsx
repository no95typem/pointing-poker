import { ChangeEvent } from 'react';
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
  useMediaQuery,
  FormLabelProps,
} from '@chakra-ui/react';

import { ReactComponent as UndrawSelectPlayer } from '../../assets/images/undraw/select-player-mod.svg';
import { ReactComponent as UndrawBusinessDecisions } from '../../assets/images/undraw/business-decisions.svg';

import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { userInfoSlice } from '../../redux/slices/userInfo';

import { SERVER_ADAPTER } from '../ServerAdapter/serverAdapter';

import UserInfoInputStack from '../../containers/UserInfoInputStack/UserInfoInputStack';
import AvatarForm from '../../containers/AvatarForm/AvatarForm';
import UserRoleRadioButtons from '../../containers/UserRoleRadioButtons/UserRoleRadioButtons';
import { useEffect } from 'react';
import { db_key, IDBMAN, STORE_NAME } from '../App/dbinit';
import { IDBManAddEntryParams } from '../../helpers/idbmanager/idbman.def';
import { GenIDBOnUpgradeFuncCommands } from '../../helpers/idbmanager/idb-onupgradefunc-generator';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import { genUniqId } from '../../../../shared/helpers/generators/browser-specific';

interface IConnectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  forDealer: boolean;
}

let saveId: string | undefined;

const ConnectPopup = ({
  isOpen,
  onClose,
  forDealer,
}: IConnectPopupProps): JSX.Element => {
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

  useEffect(() => {
    return () => {
      try {
        const addQuery: IDBManAddEntryParams = {
          objStoreName: STORE_NAME,
          obj: { ...OBJ_PROCESSOR.deepClone(userInfo), db_key: 'userInfo' },
          objKey: 'userInfo',
          paramsIfStoreNotExist: {
            command: GenIDBOnUpgradeFuncCommands.create,
            objStoreName: STORE_NAME,
            keyPath: db_key,
            autoIncrement: true,
          },
        };

        saveId = genUniqId();
        const memory = saveId;

        IDBMAN.rmEntry({
          objStoreName: STORE_NAME,
          objKey: 'userInfo',
        })
          .catch()
          .finally(() => {
            if (memory !== saveId) return;
            IDBMAN.addEntry(addQuery).catch();
          });
      } catch {}
    };
  });

  const underlined = {
    position: 'relative',
    width: 'fit-content',
    mb: '2',
    _after: {
      content: '""',
      width: '100%',
      height: '1px',
      position: 'absolute',
      bottom: '-2px',
      left: '0px',
      backgroundColor: 'black',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      onOverlayClick={onClose}
      isCentered={true}
      scrollBehavior="inside"
      size="4xl"
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
              <Flex direction="column" align="center" gridGap={2}>
                <FormLabel
                  fontFamily="handwrite"
                  fontSize="xl"
                  {...(underlined as FormLabelProps)}
                >
                  1. Enter or check your user information:
                </FormLabel>
                <UserInfoInputStack
                  {...{
                    ...userInfo,
                    isNameInvalid,
                    onChange: handleUserInfoChange,
                  }}
                />
              </Flex>
              <Flex direction="column" align="center" gridGap={4}>
                <FormLabel
                  fontFamily="handwrite"
                  fontSize="xl"
                  {...(underlined as FormLabelProps)}
                >
                  2. Setup your avatar (optional):
                </FormLabel>
                <AvatarForm />
              </Flex>
            </Flex>
            <Flex
              mt={isLargerThan640 ? '4' : undefined}
              direction="column"
              align="center"
              gridGap={6}
            >
              <FormLabel
                fontFamily="handwrite"
                fontSize="xl"
                {...(underlined as FormLabelProps)}
              >
                3. Check your role for this session:
              </FormLabel>
              {forDealer ? (
                <Flex alignItems="center" justify="space-between" gridGap={8}>
                  <Text
                    fontFamily="handwrite"
                    fontWeight="bold"
                    fontSize="lg"
                    textDecor="underline"
                  >
                    You will be a dealer!
                  </Text>
                  <UndrawBusinessDecisions
                    width="100%"
                    style={{ maxWidth: '380px' }}
                  />
                </Flex>
              ) : (
                <Flex alignItems="center" wrap="wrap" position="relative">
                  <Flex
                    position="absolute"
                    width="100%"
                    top="10px"
                    p={1}
                    backgroundBlendMode="color-burn"
                    justify="center"
                  >
                    <UserRoleRadioButtons />
                  </Flex>
                  <UndrawSelectPlayer
                    width="100%"
                    style={{ maxWidth: '380px' }}
                  />
                </Flex>
              )}
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            border="1px solid black"
            disabled={isNameInvalid}
            onClick={() => {
              forDealer
                ? SERVER_ADAPTER.createSess()
                : SERVER_ADAPTER.connToLobby();

              onClose();
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectPopup;
