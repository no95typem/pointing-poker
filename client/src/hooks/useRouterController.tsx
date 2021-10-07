import { useEffect } from 'react';
import H from 'history';
import { useHistory, useLocation } from 'react-router';
import { SessionStage } from '../../../shared/types/session/state/stages';
import { homePageSlice } from '../redux/slices/home-page';
import { useAppDispatch, useTypedSelector } from '../redux/store';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { sessionIdPathParser } from '../helpers/sessionIdParser';

const usePathParser = (params: {
  stage: SessionStage;
  sessionId?: string;
  path: string;
}) => {
  const { stage: sessionStage, path, sessionId } = params;

  const dispatch = useAppDispatch();
  const errors = useTypedSelector(state => state.errors);
  const loads = useTypedSelector(state => state.loads);

  useEffect(() => {
    if (path.includes('/session/')) {
      dispatch(homePageSlice.actions.setLobbyURL(sessionIdPathParser(path)));
    }

    // if (path.startsWith('/session/')) {
    //   const lobbyId = path.split('/')[2];
    //   dispatch(homePageSlice.actions.setLobbyURL(lobbyId));
    // }
  });

  if (Object.keys(errors).length > 0) {
    return path !== '/error' ? '/error' : undefined;
  }

  if (Object.keys(loads).length > 0) {
    return path !== '/loading' ? '/loading' : undefined;
  }

  switch (sessionStage) {
    case 'LOBBY':
      if (path !== `/session/${sessionId}/lobby`)
        return `/session/${sessionId}/lobby`;

      return undefined;
    case 'GAME':
      if (path !== `/session/${sessionId}/game`)
        return `/session/${sessionId}/game`;

      return undefined;
    case 'STATS':
      if (path !== `/session/${sessionId}/stats`)
        return `/session/${sessionId}/stats`;

      return undefined;
    case 'EMPTY':
      if (path !== `/`) return '/';

      return undefined;
    default:
      return undefined;
  }
};

export const useRouterController = (): [boolean, H.Location] => {
  const location = useLocation();
  const sessionState = useTypedSelector(state => state.session);
  const history = useHistory();
  const path = location.pathname;

  const { stage, sessionId } = sessionState;
  const requiredPathBySession = usePathParser({
    stage,
    sessionId,
    path,
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // for session
    if (requiredPathBySession) {
      history.push(requiredPathBySession);

      return;
    }
  }, [requiredPathBySession]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const newLocation = OBJ_PROCESSOR.deepClone(location);
  newLocation.pathname = requiredPathBySession || location.pathname;

  return [!!requiredPathBySession, newLocation];
};
