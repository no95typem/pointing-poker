import React from 'react';
import { Wrap, WrapItem, Input, Button } from '@chakra-ui/react';
import { useTypedSelector, useAppDispatch } from '../../../../redux/store';
import { changeText, clearText } from '../../../../redux/slices/chat';
import { sendMessage } from '../../../../redux/slices/session';

const MessageInputBox = () => {
  const dispatch = useAppDispatch();
  const { typedText } = useTypedSelector(state => state.chat);
  const sessionData = useTypedSelector(state => state.session);
  const handleClick = () => {
    if (sessionData.clientId !== undefined) {
      dispatch(sendMessage(typedText));
      dispatch(clearText());
    }
  };

  return (
    <Wrap width="100%" justify="space-around">
      <WrapItem w="60%">
        <Input
          w="100%"
          size="md"
          value={typedText}
          onChange={e => dispatch(changeText(e.target.value))}
        />
      </WrapItem>
      <Wrap>
        <Button size="md" colorScheme="facebook" onClick={handleClick}>
          Send
        </Button>
      </Wrap>
    </Wrap>
  );
};

export default MessageInputBox;
