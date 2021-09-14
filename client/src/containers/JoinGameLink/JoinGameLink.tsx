import React from 'react';

import { Button, Stack, Heading, Box, useToast } from '@chakra-ui/react';

interface ILink {
  link: string;
}

const JoinGameLink = (props: ILink) => {
  const { link } = props;

  const toast = useToast();

  const saveToClipboard = (): void => {
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: 'Successfully saved!',
        status: 'success',
        duration: 1200,
        isClosable: true,
      });
    });
  };

  return (
    <Box mb="20px">
      <Heading fontWeight="medium" fontStyle="italic" size="md">
        Link to lobby:
      </Heading>

      <Stack
        maxW="400px"
        direction="row"
        justify="flex-start"
        align="center"
        p="10px 0"
        h="45px"
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
          Copy
        </Button>
      </Stack>
    </Box>
  );
};

export default JoinGameLink;
