import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

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

const UserCards = (props: IUserCards): JSX.Element => {
  const { members, isItYou, isVotersView, isDealerPlaying, isGameStage } =
    props;

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nextArrow: <SliderCustomArrow />,
    prevArrow: <SliderCustomArrow />,

    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

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
      : role === USER_ROLES.SPECTATOR;
  };

  return (
    <Box>
      <Slider {...settings}>
        {Object.entries(members)
          .filter(([id, member]) => isCorrectMember(id, member.userRole))
          .map(([id, member]) => {
            return (
              <Box maxW="320px" key={`${id}-box`}>
                <Stack
                  mx="5px"
                  direction="row"
                  justify="center"
                  align="center"
                  border={
                    isVotersView && isGameStage ? '1px solid black' : 'none'
                  }
                  key={`${id}-wrap`}
                >
                  <UserCard
                    {...setMemberData(member)}
                    w={isVotersView && isGameStage ? '210px' : '300px'}
                    key={id}
                  />
                  {isVotersView && isGameStage && (
                    <UserVote id={+id} key={`${id}-vote`} />
                  )}
                </Stack>
              </Box>
            );
          })}
      </Slider>
    </Box>
  );
};

export default UserCards;
