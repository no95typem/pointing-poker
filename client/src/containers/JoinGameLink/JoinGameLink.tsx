import React from 'react';

import {
  Button,
  Stack,
  Heading,
  Box,
  useToast,
  useClipboard,
} from '@chakra-ui/react';

interface ILink {
  link: string;
}

const JoinGameLink = (props: ILink) => {
  const { link } = props;

  const toast = useToast();

  const { hasCopied, onCopy } = useClipboard(link);

  const saveToClipboard = (): void => {
    onCopy();

    toast({
      title: 'Successfully saved!',
      status: 'success',
      duration: 1200,
      isClosable: true,
    });
  };

  return (
    <Box mb="20px" position="relative">
      <Heading position="absolute" top="-20px" fontWeight="medium" size="md">
        Link to lobby:
      </Heading>

      <Stack
        w="100%"
        maxW="280px"
        direction="row"
        justify="flex-start"
        align="center"
        p="10px 0"
      >
        <Heading
          fontWeight="medium"
          boxShadow="lg"
          size="md"
          maxW="300px"
          m="0"
          padding="10px 0 10px 5px"
          mr="-10px"
          isTruncated={true}
          pr="10px"
        >
          {link}
        </Heading>
        <Button
          colorScheme="facebook"
          w="100px"
          variant="solid"
          onClick={saveToClipboard}
        >
          {hasCopied ? 'Done!' : 'Copy'}
        </Button>
      </Stack>
    </Box>
  );
};

export default JoinGameLink;
