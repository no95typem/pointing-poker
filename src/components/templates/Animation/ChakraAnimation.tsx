import React from 'react';

import { Code, Link, Text, VStack } from '@chakra-ui/react';

import { Logo } from '../../Logo/Logo';

const ChakraAnimation = (): JSX.Element => {
  return (
    <VStack spacing={8}>
      <Logo h="40vmin" pointerEvents="none" />
      <Text>
        Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
      </Text>
      <Link
        color="teal.500"
        href="https://chakra-ui.com"
        fontSize="2xl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Chakra
      </Link>
    </VStack>
  );
};

export default ChakraAnimation;
