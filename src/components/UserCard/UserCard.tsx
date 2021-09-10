//! Добавил еще временную переменную isKickAvailable. Проиллюстрировать, что в некоторых ситуациях
//! кнопка кика недоступна(у дилера, player не может кикнуть сам себя, и во время игрового раунда у участников).
//! Внес не окончательные изменения в интерфейс IUserCardData. Добавил флаги isItYou и isKickAvailable,
//! А также коллбэк kickPlayer(id).
//! + Возможо стоит обсудить, будет ли userCard компонентом,  и isItYou, isKickAvailable, и kickPlayer()
//! в него прокидываются в родителе, или контейнером, и он сам обращается к стейту за этими данными.
//! + сменил иконку, на более похожую на макетную

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

      <IconButton
        aria-label="Kick player"
        background="transparent"
        visibility={isKickShown ? 'visible' : 'hidden'}
        size="lg"
        icon={<ImBlocked />}
        onClick={() => kickPlayer(id, fullName)}
      />
    </Stack>
  );
};

export default UserCard;
