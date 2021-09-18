import React from 'react';

import { Spinner } from '@chakra-ui/react';

const ChakraLoader = (): JSX.Element => {
  return (
    <>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="md"
      />
    </>
  );
};

export default ChakraLoader;
