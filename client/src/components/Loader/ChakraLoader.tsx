import { Flex, Spinner } from '@chakra-ui/react';

const ChakraLoader = (): JSX.Element => {
  return (
    <Flex
      top="0px"
      left="0px"
      right="0px"
      bottom="0px"
      position="absolute"
      justify="center"
      align="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="md"
      />
    </Flex>
  );
};

export default ChakraLoader;
