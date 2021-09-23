import React, { useEffect, useState } from 'react';
import PassiveTimer from '../PassiveTimer/PassiveTimer';

export interface IGameTimerProps {
  endTime: number;
}

export const ActiveTimer = (props: IGameTimerProps): JSX.Element => {
  const [estTime, setEstTime] = useState(
    Math.max(props.endTime - Date.now(), 0),
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    const planTick = (delay: number) => {
      timeout = setTimeout(() => {
        const realEstTimeInS = (props.endTime - Date.now()) / 1000;

        const showedEstTimeInMS = Math.ceil(realEstTimeInS) * 1000;

        const newTime = Math.max(showedEstTimeInMS, 0);

        setEstTime(newTime);

        if (newTime <= 0 && timeout) clearTimeout(timeout);
        else if (timeout) {
          const shortedDelay =
            1000 - (showedEstTimeInMS - realEstTimeInS * 1000);

          console.log(showedEstTimeInMS, realEstTimeInS, shortedDelay);

          planTick(shortedDelay);
        }
      }, delay);
    };

    planTick(1000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
    };
  });

  console.log(estTime);

  return <PassiveTimer time={estTime} />;
};
