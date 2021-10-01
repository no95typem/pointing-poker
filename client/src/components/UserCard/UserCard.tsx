import { useState } from 'react';

import {
  Avatar,
  Stack,
  IconButton,
  Stat,
  AvatarBadge,
  StatNumber,
  StatHelpText,
  StackProps,
  ButtonProps,
  Tooltip,
  Flex,
} from '@chakra-ui/react';

import { ImBlocked } from 'react-icons/im';

import { IMemberData } from '../../../../shared/types/session/member';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { USER_STATES } from '../../../../shared/types/user/user-state';
import { showKickDialog } from '../../helpers/showKickDialog';

export interface IUserCard extends IMemberData {
  size?: 'sm' | 'md';
  w?: string;
  flexDirection?: 'row' | 'row-reverse';
}

const UserCard = (props: IUserCard): JSX.Element => {
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

  const [hover, setHover] = useState(false);

  const stackStyles =
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
          p: '10px 10px',
          boxShadow: 'lg',
        };

  const kickBtnStyles =
    props.size === 'sm'
      ? {
          position: 'absolute',
          top: '50%',
          // bottom: '0px',
          right: '50%',
          style: { transform: 'translate(50%, -50%) scale(1.5)' },
          opacity: hover ? '0.3' : '0.03',
          _hover: {
            opacity: '1',
          },
          minW: 'fit-content',
          height: 'fit-content',
          backgroundColor: '#ffAAAAA0',
          borderRadius: '50%',
          zIndex: '1',
        }
      : {
          position: 'absolute',
          top: '10px',
          // bottom: '0px',
          right: '10px',
          // style: { transform: 'translate(50%, -50%) scale(1.5)' },
          opacity: hover ? '0.3' : '0.03',
          _hover: {
            opacity: '1',
          },
          minW: 'fit-content',
          height: 'fit-content',
          // backgroundColor: '#ffAAAAA0',
          borderRadius: '50%',
          zIndex: '1',
        };

  return (
    <Tooltip label={fullName} placement="top" openDelay={500}>
      <Stack
        {...(stackStyles as StackProps)}
        overflow="hidden"
        position="relative"
        borderRadius="md"
        flexDirection={props.flexDirection}
        w={props.w}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
        onTouchCancel={() => setHover(false)}
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

        {isKickAvailable && (
          <IconButton
            aria-label="Kick player"
            background="transparent"
            size="lg"
            icon={<ImBlocked />}
            onClick={() => showKickDialog(id)}
            {...(kickBtnStyles as ButtonProps)}
          />
        )}
      </Stack>
    </Tooltip>
  );
};

export default UserCard;
