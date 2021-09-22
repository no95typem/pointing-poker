import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import UserCard from '../../../../components/UserCard/UserCard';
import { store, useTypedSelector } from '../../../../redux/store';
import {
  IMemberData,
  Member,
} from '../../../../../../shared/types/session/member';

export const ChatView = () => {
  const sessionData = useTypedSelector(state => state.session);
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

  return (
    <Container overflow-y="scroll">
      {Object.entries(msgs).map(([key, msg]) => {
        return (
          <Flex key={key}>
            <Container>
              <Box>{msg.text}</Box>
              <Box>{convertTime(msg.time)}</Box>
            </Container>
            <UserCard {...setMemberData(sessionData.members[msg.memberId])} />
          </Flex>
        );
      })}
    </Container>
  );
};
