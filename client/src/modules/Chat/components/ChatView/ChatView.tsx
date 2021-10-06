import { useEffect, useRef } from 'react';
import { Box, Container, Flex, Spinner, Text } from '@chakra-ui/react';
import UserCard from '../../../../components/UserCard/UserCard';
import {
  store,
  useAppDispatch,
  useTypedSelector,
} from '../../../../redux/store';
import {
  IMemberData,
  Member,
} from '../../../../../../shared/types/session/member';
import { MAX_CHAT_ENTRIES } from '../../../../../../shared/const';
import { sessionSlice } from '../../../../redux/slices/session';
import { USER_STATES } from '../../../../../../shared/types/user/user-state';
import { USER_ROLES } from '../../../../../../shared/types/user/user-role';

export const ChatView = () => {
  const sessionData = useTypedSelector(state => state.session);
  const dispatch = useAppDispatch();
  const { msgs } = store.getState().session.chat;

  const isItYou = (member: Member) => {
    return sessionData.clientId === member.userSessionPublicId;
  };

  const setMemberData = (member: Member): IMemberData => {
    return {
      member: member,
      isItYou: isItYou(member),
      isRoundStarted: false,
    };
  };

  const isEnoughUsersForKick = Object.values(sessionData.members).filter(
    m =>
      m.userState === USER_STATES.CONNECTED &&
      m.userRole === USER_ROLES.PLAYER,
  ).length > 2;

  const convertTime = (dateNow: number) => {
    const date = new Date(dateNow);

    return (
      (date.getHours() < 10 ? '0' : '') +
      date.getHours() +
      ':' +
      (date.getMinutes() < 10 ? '0' : '') +
      date.getMinutes() +
      ':' +
      (date.getSeconds() < 10 ? '0' : '') +
      date.getSeconds()
    );
  };

  const msgEntries = Object.entries(msgs);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollH = ref.current?.scrollHeight;

    if (scrollH) {
      setTimeout(() => {
        ref.current?.scroll(0, scrollH);
      });
    }

    const unreadMsgs = msgEntries.filter(entry => !entry[1].isViewed);

    if (unreadMsgs.length) dispatch(sessionSlice.actions.markChatMsgsReaded());
    // eslint-disable-next-line
  }, [msgs]);

  return (
    <Flex
      ref={ref}
      overflow-y="scroll"
      h="100%"
      border="1px"
      borderRadius="md"
      borderColor="gray.300"
      padding="1"
      direction="column"
      gridGap="2"
      width="100%"
      height="100%"
      overflow="auto"
      position="relative"
    >
      {msgEntries.length === 0 && <Text>No messages</Text>}
      {msgEntries.slice(-MAX_CHAT_ENTRIES).map(([key, msg]) => {
        const memberData = setMemberData(sessionData.members[msg.memberId]);

        return (
          <Flex
            key={key}
            direction={memberData.isItYou ? 'row-reverse' : 'row'}
            width="100%"
            gridGap="2"
          >
            <Container
              boxShadow="md"
              fontSize="sm"
              wordBreak="break-word"
              width="100%"
              borderRadius="md"
              position="relative"
              maxW="100%"
            >
              <Text fontSize="x-small">{convertTime(msg.time)}</Text>
              <Text whiteSpace="pre-wrap" w="100%">
                {msg.text}
              </Text>
              {!msg.isSynced && (
                <Box position="absolute" top="2px" right="2px" zIndex="1">
                  <Spinner size="xs" speed="1.5s" />
                </Box>
              )}
            </Container>
            <Box flexShrink={1} maxW="fit-content" w="100%">
              <UserCard
                {...memberData}
                size="sm"
                flexDirection={memberData.isItYou ? 'row' : 'row-reverse'}
                isInfoStatic
                isEnoughUsersForKick={isEnoughUsersForKick}
              />
            </Box>
          </Flex>
        );
      })}
    </Flex>
  );
};
