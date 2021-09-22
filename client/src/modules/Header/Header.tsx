import * as React from 'react';
import { ChatIcon } from '@chakra-ui/icons';

import logo from '../../assets/images/shared/logo.svg';

import {
  VisuallyHidden,
  Flex,
  IconButton,
  Spacer,
  HStack,
  Image,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../containers/ColorModeSwitcher/ColorModeSwitcher';
import { useAppDispatch } from '../../redux/store';
import { chatSlice } from '../../redux/slices/chat';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const toggleChat = (): void => {
    dispatch(chatSlice.actions.toggleChatState());
  };

  return (
    <Flex
      bg="gray.300"
      height="100%"
      alignItems="center"
      justifyContent="space-between"
      px="2"
    >
      <HStack h="100%" fontFamily="handwrite">
        <Image src={logo} maxH="95%" />
        <h1>
          Pointing Poker
          <VisuallyHidden>by no95typem, kaesid, vimbi</VisuallyHidden>
        </h1>
      </HStack>

      <HStack justifySelf="end">
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
        <Spacer />
        <IconButton
          aria-label="chat"
          icon={<ChatIcon />}
          onClick={toggleChat}
        />
      </HStack>
    </Flex>
  );
};
