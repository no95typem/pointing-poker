import { Rnd } from 'react-rnd';
import { Flex, CloseButton } from '@chakra-ui/react';
import ChatView from './components/ChatView/ChatView';
import MessageInputBox from './components/MessageInputBox/MessageInputBox';
import { useAppDispatch } from '../../redux/store';
import { chatStateToggle } from '../../redux/slices/chat';

const Chat = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const style = {
    border: 'solid 1px #ddd',
    background: '#f0f0f0',
  };

  const closeChat = (): void => {
    dispatch(chatStateToggle());
  };

  return (
    <Rnd
      style={style}
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
      >
        <CloseButton onClick={closeChat} />
        <ChatView />
        <MessageInputBox />
      </Flex>
    </Rnd>
  );
};

export default Chat;
