import React from 'react';
import { Wrap, WrapItem, Input, Button } from '@chakra-ui/react';
import { useTypedSelector, useAppDispatch } from '../../../../redux/store';
import { sendChatMessage } from '../../../../redux/slices/session';
import { chatSlice } from '../../../../redux/slices/chat';

const { setChatTypedText } = chatSlice.actions;

export const MessageInputBox = () => {
  const { typedText } = useTypedSelector(state => state.chat);
  const dispatch = useAppDispatch();

  const handleSend = () => {
    dispatch(sendChatMessage(typedText));
    dispatch(setChatTypedText(''));
  };

  return (
    <Wrap width="100%" justify="space-around">
      <WrapItem w="60%">
        <Input
          w="100%"
          size="md"
          value={typedText}
          onChange={e => dispatch(setChatTypedText(e.target.value))}
        />
      </WrapItem>
      <Wrap>
        <Button size="md" colorScheme="facebook" onClick={handleSend}>
          Send
        </Button>
      </Wrap>
    </Wrap>
  );
};
