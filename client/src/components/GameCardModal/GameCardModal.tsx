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

import { LOCALE_US } from '../../locales/locale-us';
import LoadCardCustomImage, {
  ILoadCardImgParams,
} from '../../containers/LoadCardCustomImage/LoadCardCustomImage';

const GameCardModal = (props: ICardModalData): JSX.Element => {
  const { modal, units } = props;

  const { isOpen, onClose, activeCard, changeCardValue, setCard } = modal;

  const { value } = activeCard;

  const setCardData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    changeCardValue({ ...activeCard, [input.name]: input.value });
  };

  const loadImgData: ILoadCardImgParams = {
    imgParams: {
      width: 100,
      height: 100,
    },
    card: { activeCard, changeCardValue },
    units,
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Card Data:</ModalHeader>

        <ModalBody mb="20px">
          <Stack d="flex" justify="space-around" align="stretch">
            <FormControl mb="10px" id="title" isRequired>
              <Stack spacing={2} direction="row" align="center">
                <FormLabel>Card Value:</FormLabel>
                <Input value={value} onChange={setCardData} name="value" />
              </Stack>
            </FormControl>
            <Stack spacing={2} direction="column" align="center">
              <FormLabel>{LOCALE_US.SETTINGS_CARDS_MODAL_CUSTOM}</FormLabel>
              <LoadCardCustomImage {...loadImgData} />
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Button padding="0 50px" variant="outline" onClick={onClose}>
              No
            </Button>
            <Button border="1px solid black" padding="0 50px" onClick={setCard}>
              Yes
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameCardModal;
