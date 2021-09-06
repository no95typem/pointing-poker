import React from 'react';

import { Wrap, WrapItem, Avatar } from '@chakra-ui/react';

const ChakraAvatar = (): JSX.Element => {
  return (
    <Wrap>
      <WrapItem>
        <Avatar name="Dan Abrahmov" src="" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Kola Tioluwani" src="" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
      </WrapItem>
    </Wrap>
  );
};

export default ChakraAvatar;
