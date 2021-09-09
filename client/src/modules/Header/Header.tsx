import * as React from 'react';
import { ChatIcon } from '@chakra-ui/icons';

import {
  VisuallyHidden,
  Flex,
  useDisclosure,
  Button,
  IconButton,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../containers/ColorModeSwitcher/ColorModeSwitcher';
import { HeaderDevDrawer } from './drawer';

export const Header = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg="gray.300"
      height="100%"
      alignItems="center"
      justifyContent="end"
      px="2"
    >
      <VisuallyHidden>
        <h1>Pointing-poker by no95typem, kaesid, vimbi</h1>
      </VisuallyHidden>

      <HStack justifySelf="end">
        <Button onClick={onOpen}>DEV_DRAWER</Button>
        <HeaderDevDrawer isOpen={isOpen} onClose={onClose} />
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
        <Spacer />
        <IconButton aria-label="chat" icon={<ChatIcon />} />
      </HStack>
    </Flex>
  );
};
