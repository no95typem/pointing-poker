import React, { useState } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import UserCard from '../../../../components/UserCard/UserCard';
import { store, useTypedSelector } from '../../../../redux/store';
import {
  IMemberData,
  Member,
} from '../../../../../../shared/types/session/member';

const ChatView = () => {
  const sessionData = useTypedSelector(state => state.session);
  const { msgs } = store.getState().session.chat;

  const [kickedName, setKickedName] = useState('');
  console.log(kickedName);

  const [kickedId, setKickedId] = useState(0);
  console.log(kickedId);

  const setModalWindowInfo = (id: number, name: string) => {
    setKickedId(id);

    setKickedName(name);
  };

  const isItYou = (member: Member) => {
    // return sessionData.clientId === member.userSessionPublicId;
    return true;
  };

  const setMemberData = (member: Member): IMemberData => {
    return {
      member: member,
      isItYou: isItYou(member),
      isRoundStarted: false,
      kickPlayer: setModalWindowInfo,
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
      {Object.values(msgs).map(msg => {
        return (
          <Flex>
            <Container>
              <Box>{msg.text}</Box>
              <Box>{convertTime(msg.time)}</Box>
            </Container>
            <UserCard data={setMemberData(sessionData.members[msg.memberId])} />
          </Flex>
        );
      })}
    </Container>
  );
};

export default ChatView;
