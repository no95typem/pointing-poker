import React from 'react';

import { Stack, Icon } from '@chakra-ui/react';

import { ImPlus } from 'react-icons/im';
import { IIssueData } from '../../../../shared/types/session/issue/issue';

const NewGameCardButton = (props: IIssueData): JSX.Element => {
  const { onClick } = props;

  return (
    <Stack
      w="150px"
      onClick={() => onClick()}
      align="center"
      justifyContent="center"
      p="10px 10px"
      boxShadow="lg"
      cursor="pointer"
    >
      {/* //   <IconButton
    //     aria-label="edit"
    //     background="transparent"
    //     visibility={true ? 'visible' : 'hidden'}
    //     size="lg"
    //     icon={<ImPlus />}
    //   /> */}
      <Icon as={ImPlus} w={8} h={8} color="black" />
    </Stack>
  );
};

export default NewGameCardButton;
