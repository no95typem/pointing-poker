import { ClassNames } from '@emotion/react';
import React, { useRef } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import routes from './routesData';
import templatesRoutes from './templateRoutesData';

const TRANSITION_TIME = 500;

const TRANSITION = `opacity ${TRANSITION_TIME}ms ease-in`;

export const Routes = (): JSX.Element => {
  const location = useLocation();

  const nodeRef = useRef<any>(null);

  return (
    <ClassNames>
      {({ css }) => (
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            timeout={TRANSITION_TIME}
            nodeRef={nodeRef}
            classNames={{
              enter: css({ opacity: 0 }),
              enterActive: css({
                opacity: 1,
                transition: TRANSITION,
              }),
              exit: css({ opacity: 1 }),
              exitActive: css({
                opacity: 0,
                transition: TRANSITION,
              }),
            }}
          >
            <Switch location={location}>
              {templatesRoutes.map(route => {
                const { key, path, isExact, Component } = route;

                return (
                  <Route key={key} path={path} exact={isExact}>
                    <div ref={nodeRef} key={`${key}-div`}>
                      <Component />
                    </div>
                  </Route>
                );
              })}

              {routes.map(route => {
                const { key, path, isExact, Component } = route;

                return (
                  <Route key={key} path={path} exact={isExact}>
                    <div ref={nodeRef} key={`${key}-div`}>
                      <Component />
                    </div>
                  </Route>
                );
              })}
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      )}
    </ClassNames>
  );
};
