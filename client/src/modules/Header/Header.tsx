import React from 'react';
import {
  VisuallyHidden,
  Flex,
  IconButton,
  Spacer,
  HStack,
  Image,
  useColorMode,
  Box,
  Badge,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import logo from '../../assets/images/shared/logo.svg';

import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { tryToToggleChatState } from '../../redux/slices/chat';

import { ColorModeSwitcher } from '../../containers/ColorModeSwitcher/ColorModeSwitcher';
import { AppMenu } from '../../containers/AppMenu/AppMenu';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const cMode = useColorMode();

  const toggleChat = (): void => {
    dispatch(tryToToggleChatState());
  };

  const { msgs } = useTypedSelector(state => state.session.chat);

  const unreadMsgs = Object.values(msgs).filter(msg => !msg.isViewed);

  return (
    <Flex
      bg={cMode.colorMode === 'light' ? 'gray.400' : 'gray.700'}
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
        <Box position="relative">
          <IconButton
            style={{ marginInlineStart: '0px' }}
            aria-label="chat"
            icon={<ChatIcon />}
            onClick={toggleChat}
          />
          <Badge
            pos="absolute"
            right="0px"
            top="0px"
            borderRadius="base"
            colorScheme={unreadMsgs.length > 0 ? 'orange' : undefined}
            fontSize="x-small"
          >
            {unreadMsgs.length}
          </Badge>
        </Box>
        <Spacer />
        <AppMenu />
        <Spacer />
      </HStack>
    </Flex>
  );
};
