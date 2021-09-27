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
      <Heading position="absolute" top="-20px" fontWeight="medium" size="sm">
        Link to lobby:
      </Heading>

      <Stack
        maxW="240px"
        // w="100%"
        direction="row"
        justify="flex-start"
        align="center"
        p="10px 0"
      >
        <Heading
          fontWeight="medium"
          boxShadow="lg"
          size="sm"
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
