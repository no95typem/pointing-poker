import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

import {
  IMemberData,
  IUserCards,
  Member,
} from '../../../../shared/types/session/member';
import { DEALER_ID } from '../../../../shared/const';
import { USER_ROLES } from '../../../../shared/types/user/user-role';

import UserCard from '../../components/UserCard/UserCard';
import UserVote from '../UserVote/UserVote';

import { Swiper, SwiperSlide } from 'swiper/react/';

import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from 'swiper/core';

import 'swiper/swiper.scss';
import 'swiper/components/effect-coverflow/effect-coverflow.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';

const UserCards = (props: IUserCards): JSX.Element => {
  SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

  const { members, isItYou, isVotersView, isDealerPlaying } = props;

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
    <Box maxW="300px">
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
      >
        {Object.entries(members).map(([id, member]) => {
          if (isIgnoredUser(id, member.userRole)) return null;

          return (
            <SwiperSlide key={`${id}-slide`}>
              <Stack
                direction="row"
                justify="center"
                align="center"
                key={`${id}-box`}
                border={isVotersView ? '1px solid black' : 'none'}
              >
                <UserCard {...setMemberData(member)} key={id} />;
                {isVotersView && <UserVote id={+id} key={`${id}-vote`} />}
              </Stack>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default UserCards;
