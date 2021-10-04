import { useEffect, useRef } from 'react';
import { Button, Flex, Textarea } from '@chakra-ui/react';
import { useTypedSelector, useAppDispatch } from '../../../../redux/store';
import { chatSlice } from '../../../../redux/slices/chat';
import { SERVER_ADAPTER } from '../../../ServerAdapter/serverAdapter';

const { setChatTypedText } = chatSlice.actions;

const autoGrow = (textarea: HTMLTextAreaElement) => {
  if (textarea.scrollHeight > textarea.clientHeight) {
    if (textarea.clientHeight < 120) {
      textarea.style.overflow = 'hidden';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    } else {
      textarea.style.removeProperty('overflow');
    }
  } else {
    textarea.style.removeProperty('overflow');
    textarea.style.removeProperty('height');
    setTimeout(() => autoGrow(textarea));
  }
};

export const MessageInputBox = () => {
  const { typedText } = useTypedSelector(state => state.chat);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLTextAreaElement>(null!);

  const handleSend = () => {
    if (typedText.trim()) {
      SERVER_ADAPTER.sendChatMsg(typedText);
    }
    dispatch(setChatTypedText(''));
    ref.current.focus();
  };

  useEffect(() => {
    const textarea = ref.current;
    textarea.style.overflow = 'hidden';

    const listener = () => autoGrow(textarea);

    textarea.addEventListener('keyup', listener);

    return () => {
      textarea.removeEventListener('keyup', listener);
    };
  });

  return (
    <Flex width="100%" alignItems="flex-end" gridGap="2">
      {/* <Input w="100%" size="md" /> */}
      <Textarea
        ref={ref}
        minH="unset"
        height="40px"
        value={typedText}
        onChange={e => dispatch(setChatTypedText(e.target.value))}
        overflow="hidden"
        resize="none"
        borderColor="gray.300"
        onKeyPress={e => {
          if (e.key === 'Enter' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            e.preventDefault();
            handleSend();
            const textarea = e.target as HTMLTextAreaElement;
            textarea.style.overflow = 'hidden';
            textarea.style.removeProperty('height');
          }
        }}
      ></Textarea>
      <Button border="1px solid black" size="md" onClick={handleSend}>
        Send
      </Button>
    </Flex>
  );
};
