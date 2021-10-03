import { ChatIcon } from '@chakra-ui/icons';
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import { tryToToggleSound } from '../../redux/slices/sound';

import logo from '../../assets/images/shared/logo.svg';

import {
  VisuallyHidden,
  Flex,
  IconButton,
  Spacer,
  HStack,
  Image,
  useColorMode,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../containers/ColorModeSwitcher/ColorModeSwitcher';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { tryToToggleChatState } from '../../redux/slices/chat';
import { AppMenu } from '../../containers/AppMenu/AppMenu';
import { notifSound } from '../../helpers/notifSound';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const cMode = useColorMode();
  const { isMute } = useTypedSelector(state => state.sound);

  const toggleChat = (): void => {
    dispatch(tryToToggleChatState());
  };

  const toggleSound = (): void => {
    dispatch(tryToToggleSound());
    notifSound('info');
  };

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
        <IconButton
          style={{ marginInlineStart: '0px' }}
          aria-label="chat"
          icon={<ChatIcon />}
          onClick={toggleChat}
        />
        <Spacer />
        <AppMenu />
        <Spacer />
        <IconButton
          style={{ marginInlineStart: '0px' }}
          aria-label="sound toggle"
          icon={isMute ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
          onClick={toggleSound}
        />
      </HStack>
    </Flex>
  );
};
