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
} from '@chakra-ui/react';

import { CardData } from '../../../../shared/types/session/card';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';

import LoadCardbackImage, {
  ILoadCardbackParams,
} from '../../containers/LoadCardbackImage/LoadCardbackImage';
import { INotification, notifSlice } from '../../redux/slices/notifications';
import { store } from '../../redux/store';

export interface ICardBackModal {
  isOpen: boolean;
  onClose: () => void;
  back: ICardBackData;
  setLocalSettings: (
    name: string,
    value: string | boolean | CardData[] | string[] | number,
  ) => void;
  cardbacksBase64: string[];
}

export interface ICardBackData {
  activeCardback: string;
  setActiveCardback: (base64: string) => void;
}

const CardbackModal = (props: ICardBackModal): JSX.Element => {
  const { isOpen, onClose, back, setLocalSettings, cardbacksBase64 } = props;

  const { activeCardback, setActiveCardback } = back;

  const setCardbackData = () => {
    if (!activeCardback) {
      const notification: INotification = {
        status: 'warning',
        text: 'Pleae, upload an image!',
        needToShow: true,
      };

      store.dispatch(notifSlice.actions.addNotifRec(notification));

      return;
    }

    if (cardbacksBase64.indexOf(activeCardback) === -1) {
      const backsCopy = OBJ_PROCESSOR.deepClone(cardbacksBase64);

      backsCopy.push(activeCardback);

      setLocalSettings('cardbacksBase64', backsCopy);

      closeModal();
    } else {
      const notification: INotification = {
        status: 'warning',
        text: 'You already have added this image!',
        needToShow: true,
      };

      store.dispatch(notifSlice.actions.addNotifRec(notification));
    }
  };

  const closeModal = (): void => {
    setActiveCardback('');

    onClose();
  };

  const loadImgData: ILoadCardbackParams = {
    imgParams: {
      // TODO remove, not needed anymore
      width: 200,
      height: 300,
    },
    cardback: { activeCardback, setActiveCardback },
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader mb="20px" textAlign="center">
          Upload Cardback:
        </ModalHeader>

        <ModalBody mb="20px">
          <LoadCardbackImage {...loadImgData} />
        </ModalBody>
        <ModalFooter>
          <ButtonGroup
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Button padding="0 50px" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button padding="0 50px" onClick={setCardbackData}>
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardbackModal;
