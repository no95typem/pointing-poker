import { useLayoutEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { SessionStage } from '../../../shared/types/session/state/stages';
import { homePageSlice } from '../redux/slices/home-page';
import { useAppDispatch, useTypedSelector } from '../redux/store';

const usePathParser = (params: {
  stage: SessionStage;
  sessionId?: string;
  path: string;
}) => {
  const { stage: sessionStage, path, sessionId } = params;
  const dispatch = useAppDispatch();

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
      if (path !== `/`) {
        if (path.startsWith('/session/')) {
          const lobbyId = path.split('/')[2];
          dispatch(homePageSlice.actions.setLobbyURL(lobbyId));
        }

        return '/';
      }

      return undefined;
    default:
      return undefined;
  }
};

export const useRouterController = (): string | undefined => {
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
  useLayoutEffect(() => {
    // for session
    if (requiredPathBySession) {
      history.push(requiredPathBySession);

      return;
    }
  }, [requiredPathBySession]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return requiredPathBySession;
};
