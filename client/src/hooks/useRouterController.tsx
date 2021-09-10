import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { SessionStage } from '../../../shared/types/session/state/stages';
import { useTypedSelector } from '../redux/store';

const calcRedirectPathForSession = (params: {
  stage: SessionStage;
  sessionId?: string;
  path: string;
}) => {
  const { stage: sessionStage, path, sessionId } = params;

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
      if (path.includes('session')) return '';

      return undefined;
    default:
      return undefined;
  }
};

export const useRouterController = () => {
  const location = useLocation();
  const sessionState = useTypedSelector(state => state.session);
  const history = useHistory();
  const path = location.pathname;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // for session
    const { stage, sessionId } = sessionState;
    const requiredPathBySession = calcRedirectPathForSession({
      stage,
      sessionId,
      path,
    });

    if (requiredPathBySession) {
      history.push(requiredPathBySession);

      return;
    }
  }, [path, sessionState]);
  /* eslint-enable react-hooks/exhaustive-deps */
};
