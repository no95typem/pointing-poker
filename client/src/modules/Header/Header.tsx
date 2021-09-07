import * as React from 'react';

import { Box, VisuallyHidden } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../containers/ColorModeSwitcher/ColorModeSwitcher';
import { NavLink } from 'react-router-dom';
import templatesLinks from './templatesLinks';

export const Header = (): JSX.Element => {
  return (
    <Box>
      <VisuallyHidden>
        <h1> Pointing-poker </h1>
      </VisuallyHidden>

      <nav>
        <ul className="nav nav-pills">
          {/* Kaesid start --------------------------------  Линков в хедере у нас не будет,
          так что  этот код тоже на уделение, как с компонентами из чакры определимся */}
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
          {/* Kaesid finish -------------------------------- */}
        </ul>
      </nav>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Box>
  );
};
