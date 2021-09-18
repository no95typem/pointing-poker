import React, { useState } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import UserCard from '../../../../components/UserCard/UserCard';
import { useTypedSelector } from '../../../../redux/store';
import {
  IMemberData,
  Member,
} from '../../../../../../shared/types/session/member';

const ChatView = () => {
  const sessionData = useTypedSelector(state => state.session);

  let msgs = {
    0: {
      text: 'John',
      time: Date.now(),
      memberId: 1,
    },
    1: {
      text: 'John',
      time: Date.now(),
      memberId: 2,
    },
    2: {
      text: 'John',
      time: Date.now(),
      memberId: 3,
    },
    3: {
      text: 'John',
      time: Date.now(),
      memberId: 1,
    },
    4: {
      text: 'John',
      time: Date.now(),
      memberId: 2,
    },
    5: {
      text: 'John',
      time: Date.now(),
      memberId: 3,
    },
  };

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

  return (
    <Container overflow-y="scroll">
      {Object.values(msgs).map(msg => {
        return (
          <Flex>
            <Container>
              <Box>{msg.text}</Box>
              <Box>{msg.time}</Box>
            </Container>
            <UserCard data={setMemberData(sessionData.members[msg.memberId])} />
          </Flex>
        );
      })}
    </Container>
  );
};

export default ChatView;
