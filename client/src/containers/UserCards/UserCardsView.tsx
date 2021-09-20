import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import {
  IMemberData,
  IUserCardsViewBundle,
  Member,
} from '../../../../shared/types/session/member';
import { DEALER_ID } from '../../../../shared/const';
import { USER_ROLES } from '../../../../shared/types/user/user-role';

import UserCard from '../../components/UserCard/UserCard';
import KickModal from '../../components/KickModal/KickModal';
import UserVote from '../../components/UserVote/UserVote';

const UserCardsView = (props: IUserCardsViewBundle): JSX.Element => {
  const { cardsData, modalData } = props;

  const { members, findWhoIsUser, isGameStage, isVotersView } = cardsData;

  const setMemberData = (member: Member): IMemberData => {
    return {
      member: member,
      isItYou: findWhoIsUser(member),
      isRoundStarted: false,
      kickPlayer: modalData.kickPlayer,
    };
  };

  const isIgnoredUser = (id: string, role: string): boolean => {
    return !!(
      (+id === DEALER_ID && !isVotersView) ||
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

          console.log(member.userRole);

          return (
            <Stack
              direction="row"
              justify="center"
              align="center"
              key={`${id}-box`}
              border={isVotersView ? '1px solid black' : 'none'}
            >
              <UserCard {...setMemberData(member)} key={id} />;
              {isVotersView && <UserVote key={`${id}-vote`} />}
            </Stack>
          );
        })}

        <KickModal modalData={modalData} />
      </Stack>
    </Box>
  );
};

export default UserCardsView;
