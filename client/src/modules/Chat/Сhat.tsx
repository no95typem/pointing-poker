import { Rnd } from 'react-rnd';
import {
  Flex,
  Portal,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { ChatView } from './components/ChatView/ChatView';
import { MessageInputBox } from './components/MessageInputBox/MessageInputBox';

import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { chatSlice } from '../../redux/slices/chat';
import { CloseIcon } from '@chakra-ui/icons';

const Chat = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isVisible } = useTypedSelector(state => state.chat);
  const { clientId } = useTypedSelector(state => state.session);
  const cMode = useColorMode();

  if (!isVisible || clientId === undefined) return <></>;

  const toggleChat = (): void => {
    dispatch(chatSlice.actions.toggleChatState());
  };

  return (
    <Portal>
      <Rnd
        default={{
          x: document.documentElement.clientWidth - 310,
          y: -Number.parseFloat(getComputedStyle(document.body).height) + 55,
          width: '300px',
          height: '600px',
        }}
        minWidth={320}
        minHeight={Math.min(window.innerHeight * 0.9, 520)}
        bounds="body"
      >
        <Flex
          w="95%"
          h="95%"
          direction="column"
          align="flex-end"
          bg={cMode.colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius="md"
          p="2"
          gridGap="2"
          overflow="hidden"
        >
          <IconButton
            aria-label="close-chat"
            icon={<CloseIcon style={{ transform: 'scale(1.2)' }} />}
            size="xs"
            variant="ghost"
            color="white"
            onClick={toggleChat}
          />

          <ChatView />

          <MessageInputBox />
        </Flex>
      </Rnd>
    </Portal>
  );
};

export default Chat;
