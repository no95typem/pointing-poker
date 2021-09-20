import React from 'react';

import {
  Avatar,
  Stack,
  IconButton,
  Stat,
  AvatarBadge,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

import { ImBlocked } from 'react-icons/im';

import { IMemberData } from '../../../../shared/types/session/member';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { USER_STATES } from '../../../../shared/types/user/user-state';

const UserCard = (props: IMemberData): JSX.Element => {
  const { member, isItYou, isRoundStarted, kickPlayer } = props;

  const { userInfo, userState, userRole, userSessionPublicId: id } = member;

  // console.log(userInfo, member);

  const { name, surname, avatarBase64, avatarBgColor, jobPosition } = userInfo;

  const fullName = surname ? `${name} ${surname}` : name;

  const isKickShown: boolean =
    !isRoundStarted &&
    !isItYou &&
    userRole !== USER_ROLES.DEALER &&
    userState === USER_STATES.CONNECTED;

  return (
    <Stack
      w="300px"
      h="70px"
      direction="row"
      align="center"
      p="10px 10px"
      boxShadow="lg"
    >
      <Avatar
        color="white"
        bg={avatarBgColor}
        name={fullName}
        src={avatarBase64}
      >
        {isItYou && (
          <AvatarBadge borderColor="papayawhip" bg="green.400" boxSize="1em" />
        )}
      </Avatar>

      <Stat>
        <StatNumber as={userState === USER_STATES.KICKED ? 'del' : 'abbr'}>
          {fullName}
        </StatNumber>
        <StatHelpText mb="0">{jobPosition}</StatHelpText>
      </Stat>

      {kickPlayer && isKickShown && (
        <IconButton
          aria-label="Kick player"
          background="transparent"
          size="lg"
          icon={<ImBlocked />}
          onClick={() => kickPlayer(id, fullName)}
        />
      )}
    </Stack>
  );
};

export default UserCard;
