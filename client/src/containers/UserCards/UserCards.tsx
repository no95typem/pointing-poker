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

const UserCards = (props: IUserCards): JSX.Element => {
  const { members, isItYou, isVotersView, isDealerPlaying } = props;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

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

  const isIgnoredUser = (id: string, role: string): boolean => {
    return !!(
      (+id === DEALER_ID && (!isVotersView || !isDealerPlaying)) ||
      (isVotersView && role === USER_ROLES.SPECTATOR)
    );
  };

  return (
    <Box>
      <Slider {...settings}>
        {Object.entries(members).map(([id, member]) => {
          if (isIgnoredUser(id, member.userRole)) return null;

          return (
            <Box maxW="400px" key={`${id}-box`}>
              <Stack
                ml="10px"
                direction="row"
                justify="space-between"
                align="center"
                border={isVotersView ? '1px solid black' : 'none'}
                key={`${id}-wrap`}
              >
                <UserCard {...setMemberData(member)} key={id} />
                {isVotersView && <UserVote id={+id} key={`${id}-vote`} />}
              </Stack>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default UserCards;
