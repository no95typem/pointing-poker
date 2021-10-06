import { useState } from 'react';

import {
  Avatar,
  IconButton,
  Stat,
  AvatarBadge,
  StatNumber,
  StatHelpText,
  Tooltip,
  Flex,
  FlexProps,
  Grid,
  Box,
  Text,
} from '@chakra-ui/react';

import { ImBlocked } from 'react-icons/im';

import { IMemberData } from '../../../../shared/types/session/member';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { USER_STATES } from '../../../../shared/types/user/user-state';
import { showKickDialog } from '../../helpers/showKickDialog';
import { FaGlasses, FaUserGraduate, FaUserTie } from 'react-icons/fa';

export interface IUserCard extends IMemberData {
  size?: 'sm' | 'md';
  w?: string;
  flexDirection?: 'row' | 'row-reverse';
  isInfoStatic?: true;
  isEnoughUsersForKick: boolean;
}

const UserCard = (props: IUserCard): JSX.Element => {
  const {
    member,
    isItYou,
    isRoundStarted,
    w: width,
    isPlayerSpectator,
    isEnoughUsersForKick,
  } = props;

  const { userInfo, userState, userRole, userSessionPublicId: id } = member;

  const { name, surname, avatarBase64, avatarBgColor, jobPosition } = userInfo;

  const fullName = surname ? `${name} ${surname}` : name;

  const isKickAvailable: boolean =
    isEnoughUsersForKick &&
    !isRoundStarted &&
    !isItYou &&
    userRole !== USER_ROLES.DEALER &&
    userState === USER_STATES.CONNECTED &&
    !isPlayerSpectator;

  const bageColor =
    userState === USER_STATES.CONNECTED ? 'green.400' : 'red.400';

  const [hover, setHover] = useState(false);

  const boxStyles =
    props.size === 'sm'
      ? {
          w: '140px',
          direction: 'row',
          align: 'center',
          p: '5px 5px',
          boxShadow: 'md',
        }
      : {
          w: '300px',
          h: '70px',
          direction: 'row',
          align: 'center',
          p: '10px 20px 10px 10px',
          boxShadow: 'lg',
        };

  return (
    <Tooltip label={fullName} placement="top" openDelay={500}>
      <Grid
        {...(boxStyles as FlexProps)}
        overflow="hidden"
        position="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
        onTouchCancel={() => setHover(false)}
        w={width}
        gridTemplateColumns="auto minmax(6ch, 1fr) auto"
        gridGap={4}
        alignItems="center"
      >
        <Avatar
          color="white"
          bg={avatarBgColor}
          name={fullName}
          src={avatarBase64}
          size={props.size === 'sm' ? 'sm' : undefined}
        >
          <AvatarBadge borderColor="papayawhip" bg={bageColor} boxSize="1em" />
        </Avatar>

        <Stat overflow="hidden" isTruncated={true}>
          <Flex direction="column">
            <StatNumber
              fontSize={props.size === 'sm' ? 'sm' : 'lg'}
              lineHeight={props.size === 'sm' ? '1em' : undefined}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              textDecoration={
                userState === USER_STATES.KICKED ? 'line-through' : undefined
              }
            >
              {fullName}
            </StatNumber>
          </Flex>
          <StatHelpText
            mb="0"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {jobPosition}
          </StatHelpText>
        </Stat>

        <Flex
          h="100%"
          w="fit-content"
          position={props.isInfoStatic ? 'static' : 'absolute'}
          right="0px"
          top="0px"
          p={props.size === 'sm' ? 0 : 2}
          direction="column"
          justifyContent={isKickAvailable ? 'space-between' : 'flex-end'}
          opacity={hover ? '0.3' : '0.1'}
          gridGap={0.25}
          _hover={{
            opacity: '1',
          }}
        >
          {isKickAvailable && (
            <IconButton
              aria-label="Kick player"
              icon={<ImBlocked />}
              onClick={() => showKickDialog(id)}
              minW="fit-content"
              h="fit-content"
            />
          )}

          {isItYou && <Text fontWeight="bold">YOU</Text>}

          <Box justifySelf="flex-end">
            {userRole === USER_ROLES.DEALER && <FaUserGraduate />}
            {userRole === USER_ROLES.PLAYER && <FaUserTie />}
            {userRole === USER_ROLES.SPECTATOR && <FaGlasses />}
          </Box>
        </Flex>
      </Grid>
    </Tooltip>
  );
};

export default UserCard;
