import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import {
  IMemberData,
  IUserCards,
  Member,
} from '../../../../shared/types/session/member';
import { DEALER_ID } from '../../../../shared/const';
import { USER_ROLES } from '../../../../shared/types/user/user-role';

import UserCard from '../../components/UserCard/UserCard';
import UserVote from '../UserVote/UserVote';

const UserCards = (props: IUserCards): JSX.Element => {
  const { members, isItYou, isGameStage, isVotersView, isDealerPlaying } =
    props;

  const setMemberData = (member: Member): IMemberData => {
    return {
      member: member,
      isItYou: isItYou(member),
      isRoundStarted: false,
    };
  };

  const isIgnoredUser = (id: string, role: string): boolean => {
    return !!(
      (+id === DEALER_ID && (!isVotersView || !isDealerPlaying)) ||
      (isVotersView && role === USER_ROLES.SPECTATOR)
    );
  };

  return (
    <Box mb="30px">
      {!isGameStage && (
        <Heading textAlign="center" size="lg" mb="40px">
          Members:
        </Heading>
      )}
      <Stack w="100%" wrap="wrap" direction="row">
        {Object.entries(members).map(([id, member]) => {
          if (isIgnoredUser(id, member.userRole)) return null;

          return (
            <Stack
              direction="row"
              justify="center"
              align="center"
              key={`${id}-box`}
              border={isVotersView ? '1px solid black' : 'none'}
            >
              <UserCard {...setMemberData(member)} key={id} />;
              {isVotersView && <UserVote id={+id} key={`${id}-vote`} />}
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default UserCards;
