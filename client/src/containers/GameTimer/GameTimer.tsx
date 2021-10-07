import React from 'react';
import { useTypedSelector } from '../../redux/store';
import { ActiveTimer } from '../ActiveTimer/ActiveTimer';

const GameTimer = (): JSX.Element => {
  const roundStartTime = useTypedSelector(
    state => state.session.game?.roundStartTime,
  );

  const settings = useTypedSelector(state => state.session.gSettings);

  const { roundTime, isTimerNeeded } = settings;

  if (!roundStartTime || !isTimerNeeded) return <></>;

  return (
    <ActiveTimer settings={settings} endTime={roundStartTime + roundTime} />
  );
};

export default GameTimer;
