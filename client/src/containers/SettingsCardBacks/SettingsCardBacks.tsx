import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Stack,
  useDisclosure,
  useRadioGroup,
} from '@chakra-ui/react';
import Slider from 'react-slick';

import { CardData } from '../../../../shared/types/session/card';
import { gameCardsSettings } from '../../helpers/swiperSettings';

import CardbackModal, {
  ICardBackModal,
} from '../../components/CardbackModal/CardbackModal';
import Cardback from '../../components/Cardback/Cardback';
import SessionItemRadioCard from '../../components/SessionItemRadioCard/SessionItemRadioCard';

export interface ICardbacksData {
  cardbacksBase64?: string[];
  activeCardbackBase64: string;
  setLocalSettings: (
    name: string,
    value: string | boolean | CardData[] | string[] | number,
  ) => void;
}

const SettingsCardBacks = (props: ICardbacksData): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeCardback, setActiveCardback] = useState('');

  const { activeCardbackBase64, cardbacksBase64, setLocalSettings } = props;

  const currentId = cardbacksBase64?.indexOf(activeCardbackBase64);

  const setCardback = (id: string) => {
    if (cardbacksBase64 && +id !== -1) {
      setLocalSettings('activeCardbackBase64', cardbacksBase64[+id]);
    }
  };

  const { getRadioProps } = useRadioGroup({
    name: 'cardbacks',
    value: String(currentId),
    onChange: setCardback,
  });

  const cardbackModalData: ICardBackModal = {
    isOpen,
    onClose,
    back: { activeCardback, setActiveCardback },
    setLocalSettings,
    cardbacksBase64: cardbacksBase64 ? cardbacksBase64 : [],
  };

  return (
    <>
      <Flex
        direction="column"
        gridGap={4}
        h="100%"
        w="100%"
        justify="space-between"
        align="flex-end"
      >
        <Flex
          maxW="100%"
          wrap="wrap"
          align="center"
          justify="center"
          gridGap={2}
        >
          <Button onClick={onOpen}>Add cardback</Button>
        </Flex>

        {cardbacksBase64 && (
          <Box w="90%" m="0 auto">
            <Slider {...gameCardsSettings}>
              {cardbacksBase64.map((src, id) => {
                const radio = (
                  getRadioProps as (obj: { value: string }) => any
                )({
                  value: String(id),
                });

                return (
                  <SessionItemRadioCard key={`${id}-radio`} {...radio}>
                    <Stack
                      direction="row"
                      mx="5px"
                      justify="center"
                      align="center"
                    >
                      <Cardback src={src} key={id} />
                    </Stack>
                  </SessionItemRadioCard>
                );
              })}
            </Slider>
          </Box>
        )}

        <Box></Box>
      </Flex>

      <CardbackModal {...cardbackModalData} />
    </>
  );
};

export default SettingsCardBacks;
