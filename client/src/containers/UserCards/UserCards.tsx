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

import {
  IMemberData,
  IUserCards,
  Member,
} from '../../../../shared/types/session/member';
import { DEALER_ID } from '../../../../shared/const';
import { USER_ROLES } from '../../../../shared/types/user/user-role';

import UserCard from '../../components/UserCard/UserCard';
import UserVote from '../UserVote/UserVote';
import SliderCustomArrow from '../../components/SliderCustomArrow/SliderCustomArrow';
import { ReactComponent as UndrawTreeSwing } from '../../assets/images/undraw/tree-swing.svg';

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
  const { members, isItYou, isVotersView, isDealerPlaying } = props;
  const [isLargerThen780] = useMediaQuery('(min-width: 780px)');
  const [isLargerThen1200] = useMediaQuery('(min-width: 1200px)');
  const [isLargerThen1400] = useMediaQuery('(min-width: 1400px)');

  const setMemberData = (member: Member): IMemberData => {
    return {
      member: member,
      isItYou: isItYou(member),
      isRoundStarted: false,
    };
  };

  const isCorrectMember = (id: string, role: string): boolean => {
    const isDealer = +id === DEALER_ID;

    return isVotersView
      ? (isDealer && isDealerPlaying) || role === USER_ROLES.PLAYER
      : (isDealer && !isDealerPlaying) || role === USER_ROLES.SPECTATOR;
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

  const selectedMemebers = Object.entries(members).filter(([id, member]) =>
    isCorrectMember(id, member.userRole),
  );

  if (selectedMemebers.length === 0)
    return (
      <Flex w="100%" h="100%" justify="center" align="center" gridGap={4}>
        <UndrawTreeSwing style={{ height: '100%' }} />
        <Text>There are no members with this role yet :(</Text>
      </Flex>
    );

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
                key={`${id}-wrap`}
              >
                <UserCard
                  {...setMemberData(member)}
                  w={isUserVoteVisible ? '210px' : '100%'}
                  key={id}
                />
                {isUserVoteVisible && <UserVote id={+id} key={`${id}-vote`} />}
              </Stack>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default UserCards;
