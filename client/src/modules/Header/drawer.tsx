import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  DrawerFooter,
  Flex,
} from '@chakra-ui/react';
import templatesLinks from './templatesLinks';
import { NavLink } from 'react-router-dom';

export interface HeaderDevDrawerProps {
  isOpen: boolean;
  onClose: () => unknown;
}

export const HeaderDevDrawer = (props: HeaderDevDrawerProps): JSX.Element => {
  const { isOpen, onClose } = props;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      {/* <DrawerOverlay /> */}
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Dev links</DrawerHeader>

        <DrawerBody>
          <Flex direction="column" gap={2}>
            {templatesLinks.map(linkData => {
              const { link, text } = linkData;

              return (
                <li className="nav-item" key={`${link}-li`}>
                  <NavLink
                    exact
                    strict
                    className="nav-link"
                    to={link}
                    key={`${link}-nav`}
                  >
                    {text}
                  </NavLink>
                </li>
              );
            })}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
