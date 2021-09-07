// ! Поскольку аватар chakra из коробки генерирует нужный нам формат в виде круга с инициалами,
// ! предлагаю слегка изменить структуру: avatarSrc  теперь необяззательный параметр,
// ! который в карточку добавляется  только если пользователь загрузил свой аватар.
// ! Цвет круга задается через параметр avatarBg. Корректно принимается как названия цветов, так и формат rgb(x,y,z)
// ! Чтобы не перегружать интерфейс текстом, предлагаю отметку,
// ! что это карточка текущего пользователя сделать иконкой(AvatarBadge)
// ! Дизайн не окончательный. Окончательный реализую, после того как определеимся со шрифтами и прочим.
// ! isItYou - заглушка. В будущем тут будет сверка id пользователя с текущим id от сервера.

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

import { BiBlock } from 'react-icons/bi';

import { IUserCardData } from '../../../../shared/types/user/user-info';

const UserCard = (props: IUserCardData): JSX.Element => {
  const { card } = props;

  const { name, surname, avatarBase64, avatarBgColor, jobPosition } = card;

  const fullName = surname ? `${name} ${surname}` : name;

  const isItYou = true;

  return (
    <Stack
      direction="row"
      spacing={3}
      align="center"
      p="10px 10px"
      boxShadow="lg"
    >
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
        <StatNumber>{fullName}</StatNumber>
        <StatHelpText mb="0">{jobPosition}</StatHelpText>
      </Stat>

      <IconButton
        aria-label="Kick player"
        background="transparent"
        size="lg"
        icon={<BiBlock />}
      />
    </Stack>
  );
};

export default UserCard;
