import React from 'react';
import { useTypedSelector } from '../../redux/store';
import { ActiveTimer } from '../ActiveTimer/ActiveTimer';

const GameTimer = (): JSX.Element => {
  const roundStartTime = useTypedSelector(
    state => state.session.game?.roundStartTime,
  );

  const roundTime = useTypedSelector(
    state => state.session.gSettings.roundTime,
  );

  const isTimerNeeded = useTypedSelector(
    state => state.session.gSettings.isTimerNeeded,
  );

  if (!roundStartTime || !isTimerNeeded) return <></>;

  return <ActiveTimer endTime={roundStartTime + roundTime} />;
};

export default GameTimer;
