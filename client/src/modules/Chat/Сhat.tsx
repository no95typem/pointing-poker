import { Rnd } from 'react-rnd';
import {
  Flex,
  Portal,
  useColorMode,
  IconButton,
  Heading,
} from '@chakra-ui/react';
import { ChatView } from './components/ChatView/ChatView';
import { MessageInputBox } from './components/MessageInputBox/MessageInputBox';

import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { chatSlice } from '../../redux/slices/chat';
import { CloseIcon } from '@chakra-ui/icons';
import { BsArrowsMove } from 'react-icons/bs';
import './Chat.scss';

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
          x: document.documentElement.clientWidth - 325,
          y: -Number.parseFloat(getComputedStyle(document.body).height) + 55,
          width: '300px',
          height: '600px',
        }}
        minWidth={320}
        minHeight={Math.min(window.innerHeight * 0.9, 520)}
        bounds="body"
      >
        <Flex
          w="100%"
          h="100%"
          direction="column"
          align="flex-end"
          bg={cMode.colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius="md"
          p="2"
          gridGap="2"
          overflow="hidden"
          position="relative"
        >
          <Flex width="100%" alignItems="flex-end" gridGap="2">
            <Flex
              width="100%"
              height="100%"
              className="dragHandle"
              border="1px"
              borderRadius="md"
              borderColor="gray.300"
              bg="gray.300"
              justifyContent="space-around"
              alignItems="center"
            >
              <BsArrowsMove />
              <Heading as="h2" size="sm" fontFamily="handwrite">
                For drag and drop take here
              </Heading>
            </Flex>
            <IconButton
              aria-label="close-chat"
              icon={<CloseIcon style={{ transform: 'scale(1.2)' }} />}
              size="xs"
              variant="ghost"
              color="white"
              onClick={toggleChat}
            />
          </Flex>

          <ChatView />

          <MessageInputBox />
        </Flex>
      </Rnd>
    </Portal>
  );
};

export default Chat;
