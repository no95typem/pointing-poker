import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import {
  IMemberData,
  IUserCardsViewBundle,
  Member,
} from '../../../../shared/types/session/member';

import UserCard from '../../components/UserCard/UserCard';
import { DEALER_ID } from '../../../../shared/const';

const UserCardsView = (props: IUserCardsViewBundle): JSX.Element => {
  const { cardsData, modalData } = props;

  const { members, findWhoIsUser } = cardsData;

  const setMemberData = (member: Member): IMemberData => {
    return {
      member: member,
      isItYou: findWhoIsUser(member),
      isRoundStarted: false,
      kickPlayer: modalData.kickPlayer,
    };
  };

  return (
    <Box mb="30px">
      <Heading textAlign="center" size="lg" mb="40px">
        Members:
      </Heading>
      <Stack w="100%" wrap="wrap" direction="row">
        {Object.entries(members).map(([id, member]) => {
          if (+id === DEALER_ID) return null;

          return (
            <Stack w="300px" key={`${id}-wrap`}>
              <UserCard {...setMemberData(member)} key={id} />;
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default UserCardsView;
