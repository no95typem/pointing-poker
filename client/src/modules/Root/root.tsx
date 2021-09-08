import React from 'react';

import { Button, Text, VStack } from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/store';
import { createSession } from '../../redux/slices/connect';

export const Root = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <VStack>
      <Text>I'm start(root) page</Text>
      <Button onClick={() => dispatch(createSession())}>
        try to create new session
      </Button>
    </VStack>
  );
};
