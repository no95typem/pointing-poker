import React, { useEffect, useState } from 'react';
import { ISettings } from '../../../../shared/types/settings';
import PassiveTimer from '../InputTimer/InputTimer';

export interface IGameTimerProps {
  endTime: number;
  settings: ISettings;
}

export const ActiveTimer = (props: IGameTimerProps): JSX.Element => {
  const { endTime, settings } = props;

  const [estTime, setEstTime] = useState(Math.max(endTime - Date.now(), 0));

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    const planTick = (delay: number) => {
      timeout = setTimeout(() => {
        const realEstTimeInS = (endTime - Date.now()) / 1000;

        const showedEstTimeInMS = Math.ceil(realEstTimeInS) * 1000;

        const newTime = Math.max(showedEstTimeInMS, 0);

        setEstTime(newTime);

        if (newTime <= 0 && timeout) clearTimeout(timeout);
        else if (timeout) {
          const shortedDelay =
            1000 - (showedEstTimeInMS - realEstTimeInS * 1000);

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

  return <PassiveTimer settings={settings} time={estTime} />;
};
