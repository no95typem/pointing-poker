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

import AvatarForm from '../../modules/HomePage/components/avatar-form/avatar-form';
import { LOCALE_US } from '../../locales/locale-us';

const GameCardModal = (props: ICardModalData): JSX.Element => {
  const { modal } = props;

  const { isOpen, onClose, activeCard, changeCardValue, setCard } = modal;

  const { value, base64 } = activeCard;

  console.log(base64); //! если загружено изображение, засетать его в base64, иначе =undefined

  const setCardData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    changeCardValue({ ...activeCard, [input.name]: input.value });
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
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
                <AvatarForm />
                {/* Требуется слегка изменненная версия данного компонента:
                без дефолтной аватары, кнопка ресет - отсутствие изображения. */}
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
              <Button padding="0 50px" variant="outline" onClick={onClose}>
                No
              </Button>
              <Button padding="0 50px" onClick={setCard}>
                Yes
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameCardModal;
