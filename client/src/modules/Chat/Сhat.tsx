import { Rnd } from 'react-rnd';
import {
  Flex,
  Portal,
  useColorMode,
  IconButton,
  Box,
  Text,
} from '@chakra-ui/react';
import { ChatView } from './components/ChatView/ChatView';
import { MessageInputBox } from './components/MessageInputBox/MessageInputBox';

import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { chatSlice } from '../../redux/slices/chat';
import { CloseIcon } from '@chakra-ui/icons';
import { BsArrowsMove } from 'react-icons/bs';
import './Chat.scss';
import { useState } from 'react';

import { ReactComponent as UndrawBeginChat } from '../../assets/images/undraw/begin-chat.svg';

const Chat = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isVisible } = useTypedSelector(state => state.chat);
  const { clientId } = useTypedSelector(state => state.session);
  const cMode = useColorMode();
  const [disableDragging, setDisableDragging] = useState(true);

  if (!isVisible || clientId === undefined) return <></>;

  const toggleChat = (): void => {
    dispatch(chatSlice.actions.toggleChatState());
  };

  return (
    <Portal>
      <Box position="fixed" top="0px" left="0px" width="0px" height="0px">
        <Rnd
          default={{
            x: document.documentElement.clientWidth - 325,
            y: 55,
            width: '300px',
            height: '600px',
          }}
          minWidth={320}
          minHeight={Math.min(window.innerHeight * 0.9, 520)}
          bounds="body"
          disableDragging={disableDragging}
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
            userSelect="auto"
          >
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              gridGap="2"
            >
              <Flex
                height="100%"
                borderRadius="md"
                alignItems="center"
                gridGap="2"
                paddingX={2}
                onMouseEnter={() => setDisableDragging(false)}
                onMouseLeave={() => setDisableDragging(true)}
                onTouchStartCapture={() => setDisableDragging(false)}
                onTouchStart={() => setDisableDragging(false)}
                onTouchEnd={() => setDisableDragging(true)}
                onTouchCancel={() => setDisableDragging(true)}
                userSelect="none"
                color={cMode.colorMode === 'light' ? 'black' : 'white'}
                bg={cMode.colorMode === 'light' ? 'gray.300' : 'whiteAlpha.200'}
              >
                <BsArrowsMove style={{ transform: 'scale(1.2)' }} />
                <Text fontFamily="handwrite" fontSize="sm">
                  For drag and drop take here
                </Text>
              </Flex>

              <IconButton
                aria-label="close-chat"
                icon={<CloseIcon style={{ transform: 'scale(1.2)' }} />}
                size="xs"
                _hover={{
                  backgroundColor:
                    cMode.colorMode === 'light' ? 'gray.300' : 'whiteAlpha.200',
                }}
                variant="ghost"
                color={cMode.colorMode === 'light' ? 'gray.800' : 'white'}
                onClick={toggleChat}
              />
            </Flex>

            <Box w="100%" h="100%" position="relative" overflow="hidden">
              <UndrawBeginChat
                style={{
                  maxHeight: '100%',
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  opacity: '0.3',
                }}
              />

              <ChatView />
            </Box>

            <MessageInputBox />
          </Flex>
        </Rnd>
      </Box>
    </Portal>
  );
};

export default Chat;
