import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import { IMemberData } from '../../../../shared/types/session/member';

import UserCard from '../../components/UserCard/UserCard';
import KickModal, { IKickModal } from '../../components/KickModal/KickModal';

interface IUserCardView {
  membersData: IMemberData[];
  modalData: IKickModal;
}

const UserCardsView = (props: IUserCardView): JSX.Element => {
  const { membersData, modalData } = props;

  return (
    <Box mb="30px">
      <Heading textAlign="center" size="lg" mb="40px">
        Members:
      </Heading>
      <Stack w="100%" wrap="wrap" direction="row">
        {membersData.map(memberData => {
          const id = memberData.member.userSessionPublicId;

          return (
            <Stack w="300px" key={`${id}-wrap`}>
              <UserCard data={memberData} key={id} />;
            </Stack>
          );
        })}

        <KickModal data={modalData} />
      </Stack>
    </Box>
  );
};

export default UserCardsView;
