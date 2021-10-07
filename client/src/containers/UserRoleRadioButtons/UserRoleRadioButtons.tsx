import React, { useMemo } from 'react';
import { useRadioGroup, Text, Flex } from '@chakra-ui/react';
import { UserRole, USER_ROLES } from '../../../../shared/types/user/user-role';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { homePageSlice } from '../../redux/slices/home-page';
import { ButtonLikeRadioCard } from '../../components/ButtonLikeRadioCard/ButtonLikeRadioCard';

const options = [USER_ROLES.PLAYER, USER_ROLES.SPECTATOR];

const UserRoleRadioButtons = () => {
  const userRole = useTypedSelector(state => state.homePage.lastUserRole);
  const dispatch = useAppDispatch();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: USER_ROLES.PLAYER,
    onChange: e => dispatch(homePageSlice.actions.setUserRole(e as UserRole)),
    value: userRole,
  });

  const group = getRootProps();

  const dir = useMemo(() => (Math.random() > 0.5 ? 'row' : 'row-reverse'), []);

  return (
    <Flex direction={dir} {...group}>
      {options.map(value => {
        const radio = (getRadioProps as (obj: { value: string }) => any)({
          value,
        });

        return (
          <ButtonLikeRadioCard key={value} {...radio}>
            <Text fontFamily="handwrite" fontWeight="extrabold" fontSize="lg">
              {value}
            </Text>
          </ButtonLikeRadioCard>
        );
      })}
    </Flex>
  );
};

export default UserRoleRadioButtons;
