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
import { showKickDialog } from '../../hooks/useKickDialog';

const UserCard = (props: IMemberData): JSX.Element => {
  const { member, isItYou, isRoundStarted } = props;

  const { userInfo, userState, userRole, userSessionPublicId: id } = member;

  const { name, surname, avatarBase64, avatarBgColor, jobPosition } = userInfo;

  const fullName = surname ? `${name} ${surname}` : name;

  const isKickAvailable: boolean =
    !isRoundStarted &&
    !isItYou &&
    userRole !== USER_ROLES.DEALER &&
    userState === USER_STATES.CONNECTED;

  const bageColor =
    userState === USER_STATES.CONNECTED ? 'green.400' : 'red.400';

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
        <AvatarBadge borderColor="papayawhip" bg={bageColor} boxSize="1em" />
      </Avatar>

      <Stat>
        <StatNumber as={userState === USER_STATES.KICKED ? 'del' : 'abbr'}>
          {fullName}
        </StatNumber>
        <StatHelpText mb="0">{jobPosition}</StatHelpText>
      </Stat>

      {isKickAvailable && (
        <IconButton
          aria-label="Kick player"
          background="transparent"
          size="lg"
          icon={<ImBlocked />}
          onClick={() => showKickDialog(id)}
        />
      )}
    </Stack>
  );
};

export default UserCard;
