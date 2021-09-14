import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import {
  IMemberData,
  IUserCardsViewBundle,
  Member,
} from '../../../../shared/types/session/member';

import UserCard from '../../components/UserCard/UserCard';
import KickModal from '../../components/KickModal/KickModal';

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
          if (!+id) return null;

          return (
            <Stack w="300px" key={`${id}-wrap`}>
              <UserCard data={setMemberData(member)} key={id} />;
            </Stack>
          );
        })}

        <KickModal modalData={modalData} />
      </Stack>
    </Box>
  );
};

export default UserCardsView;
