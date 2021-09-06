import React from 'react';

import {
  Stack,
  CloseButton,
  Button,
  ButtonGroup,
  Grid,
} from '@chakra-ui/react';

const ChakraButtons = (): JSX.Element => {
  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={10} justifyItems="center">
      <Stack direction="row" align="center" spacing={5}>
        <CloseButton size="sm" />
        <CloseButton size="md" />
        <CloseButton size="lg" />
      </Stack>
      <Stack spacing={5} direction="row" align="center">
        <Button colorScheme="teal" size="xs">
          Button
        </Button>
        <Button colorScheme="teal" size="sm">
          Button
        </Button>
        <Button colorScheme="teal" size="md">
          Button
        </Button>
        <Button colorScheme="teal" size="lg">
          Button
        </Button>
      </Stack>
      <Stack direction="row" spacing={5} align="center">
        <Button colorScheme="teal" variant="solid">
          Button
        </Button>
        <Button colorScheme="teal" variant="outline">
          Button
        </Button>
        <Button colorScheme="teal" variant="ghost">
          Button
        </Button>
        <Button colorScheme="teal" variant="link">
          Button
        </Button>
      </Stack>
      <Stack direction="row" spacing={5} align="center">
        <Button isLoading colorScheme="teal" variant="solid">
          Email
        </Button>
        <Button
          isLoading
          loadingText="Loading"
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="start"
        >
          Submit
        </Button>
        <Button
          isLoading
          loadingText="Loading"
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="end"
        >
          Continue
        </Button>
      </Stack>
      <ButtonGroup
        colorScheme="facebook"
        width="28%"
        display="flex"
        justifyContent="space-between"
      >
        <Button padding="0 50px">Confirm</Button>
        <Button padding="0 50px" variant="outline">
          Cancel
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default ChakraButtons;
