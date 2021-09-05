import { ClassNames } from '@emotion/react';
import React, { useRef } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { ChakraDemo } from '../ChakraDemo/ChakraDemo';

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
              <Route exact strict path="/">
                <div ref={nodeRef}>root</div>
              </Route>
              <Route exact path="/session/:id/lobby">
                <div ref={nodeRef}>lobby</div>
              </Route>
              <Route exact path="/session/:id/game">
                <div ref={nodeRef}>game</div>
              </Route>
              <Route exact path="/session/:id/stats">
                <div ref={nodeRef}>stats</div>
              </Route>
              <Route path="*">
                <div ref={nodeRef}>
                  <ChakraDemo />
                </div>
              </Route>
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      )}
    </ClassNames>
  );
};
