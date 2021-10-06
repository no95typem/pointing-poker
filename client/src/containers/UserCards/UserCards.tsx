import {
  Box,
  Flex,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ReactComponent as UndrawTreeSwing } from '../../assets/images/undraw/tree-swing.svg';
import {
  IMemberData,
  IUserCards,
  Member,
} from '../../../../shared/types/session/member';
import { DEALER_ID } from '../../../../shared/const';
import { USER_ROLES } from '../../../../shared/types/user/user-role';

import UserVote from '../UserVote/UserVote';
import UserCard from '../../components/UserCard/UserCard';
import SliderCustomArrow from '../../components/SliderCustomArrow/SliderCustomArrow';
import { USER_STATES } from '../../../../shared/types/user/user-state';

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 1,
  nextArrow: <SliderCustomArrow />,
  prevArrow: <SliderCustomArrow />,

  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 370,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        dots: true,
        arrows: false,
        // dotsClass: null, // TODO!
      },
    },
  ],
};

const UserCards = (props: IUserCards): JSX.Element => {
  const { members, isItYou, isDealerPlaying, isVotersView, isPlayerSpectator } =
    props;

  const [isLargerThen780] = useMediaQuery('(min-width: 780px)');

  const [isLargerThen1200] = useMediaQuery('(min-width: 1200px)');

  const [isLargerThen1400] = useMediaQuery('(min-width: 1400px)');

  const setMemberData = (member: Member): IMemberData => {
    return {
      member: member,
      isItYou: isItYou(member),
      isRoundStarted: false,
      isPlayerSpectator,
    };
  };

  const isCorrectMember = (id: string, member: Member): boolean => {
    const isDealer = +id === DEALER_ID;

    const { userRole: role, userState: state } = member;

    if (state !== 'CONNECTED') return false;

    return isVotersView
      ? (isDealer && isDealerPlaying) || role === USER_ROLES.PLAYER
      : role === USER_ROLES.SPECTATOR;
  };

  const w = isLargerThen780
    ? isLargerThen1200
      ? isLargerThen1400
        ? '98%'
        : '980px'
      : '640px'
    : '320px';

  const isUserVoteVisible = isVotersView && props.isGameStage;

  const cMode = useColorMode();

  const isEnoughUsersForKick = Object.values(members).filter(
    m =>
      m.userState === USER_STATES.CONNECTED &&
      m.userRole === USER_ROLES.PLAYER,
  ).length > 2;

  const selectedMemebers = Object.entries(members).filter(([id, member]) =>
    isCorrectMember(id, member),
  );

  if (!selectedMemebers.length) {
    return (
      <Flex w="100%" h="100%" justify="center" align="center" gridGap={4}>
        <UndrawTreeSwing style={{ height: '100%' }} />
        <Text>There are no members with this role yet :(</Text>
      </Flex>
    );
  }

  return (
    <Box w={w}>
      <Slider {...settings}>
        {selectedMemebers.map(([id, member]) => {
          return (
            <Box maxW="320px" key={`${id}-box`}>
              <Stack
                mx="5px"
                direction="row"
                justify="center"
                align="center"
                border="1px solid"
                borderRadius="sm"
                borderColor={
                  cMode.colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.200'
                }
              >
                <UserCard
                  {...setMemberData(member)}
                  w={isUserVoteVisible ? '300px' : '100%'}
                  isEnoughUsersForKick={isEnoughUsersForKick}
                />
                {isUserVoteVisible && <UserVote id={+id} />}
              </Stack>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default UserCards;
