import React from 'react';
import { useTypedSelector } from '../../redux/store';
import { ActiveTimer } from '../ActiveTimer/ActiveTimer';

export const GameTimer = (): JSX.Element => {
  const roundStartTime = useTypedSelector(
    state => state.session.game?.roundStartTime,
  );

  const roundTime = useTypedSelector(
    state => state.session.gSettings?.roundTime,
  );

  if (!roundStartTime) return <></>;

  return <ActiveTimer endTime={roundStartTime + roundTime} />;
};
