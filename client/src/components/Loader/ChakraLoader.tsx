import React from 'react';

import { Spinner } from '@chakra-ui/react';

const ChakraLoader = (): JSX.Element => {
  return (
    <>
      <Spinner
        position="absolute"
        top="50%"
        left="50%"
        right="0"
        bottom="0"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </>
  );
};

export default ChakraLoader;
