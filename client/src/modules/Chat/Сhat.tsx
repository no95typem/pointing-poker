import { Rnd } from 'react-rnd';
import { Flex, CloseButton, Portal } from '@chakra-ui/react';
import { ChatView } from './components/ChatView/ChatView';
import { MessageInputBox } from './components/MessageInputBox/MessageInputBox';

import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { chatSlice } from '../../redux/slices/chat';

const Chat = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isVisible } = useTypedSelector(state => state.chat);
  const { clientId } = useTypedSelector(state => state.session);

  if (!isVisible || clientId === undefined) return <></>;

  const toggleChat = (): void => {
    dispatch(chatSlice.actions.toggleChatState());
  };

  return (
    <Portal>
      <Rnd
        default={{
          x: document.documentElement.clientWidth / 2,
          y: -document.documentElement.clientHeight,
          width: document.documentElement.clientWidth / 7,
          height: document.documentElement.clientHeight / 1.5,
        }}
        minWidth={320}
        minHeight={568}
        bounds="body"
      >
        <Flex
          w="95%"
          h="95%"
          direction="column"
          align="flex-end"
          justify="space-between"
          background="InfoBackground"
        >
          <CloseButton onClick={toggleChat} />
          <ChatView />
          <MessageInputBox />
        </Flex>
      </Rnd>
    </Portal>
  );
};

export default Chat;
