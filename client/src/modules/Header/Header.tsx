import * as React from 'react';
import { ChatIcon } from '@chakra-ui/icons';

import logo from '../../assets/images/shared/logo.svg';

import {
  VisuallyHidden,
  Flex,
  useDisclosure,
  Button,
  IconButton,
  Spacer,
  HStack,
  Image,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../containers/ColorModeSwitcher/ColorModeSwitcher';
import { HeaderDevDrawer } from './drawer';

export const Header = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg="gray.300"
      height="100%"
      alignItems="center"
      justifyContent="space-between"
      px="2"
    >
      <HStack h="100%">
        <Image src={logo} maxH="95%" />
        <h1>
          Pointing Poker
          <VisuallyHidden>by no95typem, kaesid, vimbi</VisuallyHidden>
        </h1>
      </HStack>

      <HStack justifySelf="end">
        <Button onClick={onOpen}>DEV_DRAWER</Button>
        <HeaderDevDrawer isOpen={isOpen} onClose={onClose} />
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
        <Spacer />
        <IconButton aria-label="chat" icon={<ChatIcon />} />
      </HStack>
    </Flex>
  );
};
