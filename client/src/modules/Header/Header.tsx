import * as React from 'react';

import { Box } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../containers/ColorModeSwitcher/ColorModeSwitcher';
import { NavLink } from 'react-router-dom';

export const Header = (): JSX.Element => {
  return (
    <Box>
      <nav>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink exact strict className="nav-link" to="/">
              root
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/fadas">
              rand
            </NavLink>
          </li>
        </ul>
      </nav>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Box>
  );
};
