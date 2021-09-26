import { ClassNames } from '@emotion/react';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { ErrorsMUX } from '../../containers/ErrorsMUX/ErrorsMUX';
import { LoadsMUX } from '../../containers/LoadsMUX/LoadsMUX';
import { useRouterController } from '../../hooks/useRouterController';

import ROUTES from './routesData';

const TRANSITION_TIME = 500;

const TRANSITION = `opacity ${TRANSITION_TIME}ms ease-in-out`;

export const Routes = (): JSX.Element => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const location = useRouterController()[1];

  return (
    <ClassNames>
      {({ css }) => (
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            addEndListener={done => {
              if (nodeRef.current) {
                nodeRef.current.addEventListener('transitionend', done, false);
              } else setTimeout(done, TRANSITION_TIME);
            }}
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
                transition: 'all 0.1s',
              }),
            }}
          >
            <Switch location={location}>
              <Route key="ErrorsMUX" path="/error">
                <div ref={nodeRef}>
                  <ErrorsMUX />
                </div>
              </Route>

              <Route key="LoadsMUX" path="/loading">
                <div ref={nodeRef}>
                  <LoadsMUX />
                </div>
              </Route>

              {ROUTES.map(route => {
                const { key, path, isExact, Component } = route;

                return (
                  <Route key={key} path={path} exact={isExact}>
                    <div ref={nodeRef}>
                      <Component />
                    </div>
                  </Route>
                );
              })}
              {/* ! TODO (no95typem) error */}
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      )}
    </ClassNames>
  );
};
