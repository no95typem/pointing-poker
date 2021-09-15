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

import { IMemberDataBundle } from '../../../../shared/types/session/member';

const UserCard = (props: IMemberDataBundle): JSX.Element => {
  const { data } = props;

  const { member, isItYou, isRoundStarted, kickPlayer } = data;

  const { userInfo, userState, userRole, userSessionPublicId: id } = member;

  console.log(userInfo, member);

  const { name, surname, avatarBase64, avatarBgColor, jobPosition } = userInfo;

  const fullName = surname ? `${name} ${surname}` : name;

  const isKickShown: boolean =
    !isRoundStarted &&
    !isItYou &&
    userRole !== 'DEALER' &&
    userState === 'CONNECTED';

  return (
    <Stack direction="row" align="center" p="10px 10px" boxShadow="lg">
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
        <StatNumber as={userState === 'KICKED' ? 'del' : 'abbr'}>
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
