import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { ITimerTabs } from '../containers/InputTimer/InputTimer';
import {
  addNotifRec,
  INotification,
  notifSlice,
} from '../redux/slices/notifications';
import { store } from '../redux/store';

const timerValidation = (
  units: 'minutes' | 'seconds',
  timerData: ITimerTabs,
): ITimerTabs => {
  const timer = OBJ_PROCESSOR.deepClone(timerData);

  switch (true) {
    case Number.isNaN(timer[units]):
      timer.minutes = 0;
      timer.seconds = 10;

      const notification: INotification = {
        status: 'warning',
        text: `Numbers only, please!`,
        needToShow: true,
      };

      store.dispatch(addNotifRec(notification));

      break;

    case timer[units] > 59:
      timer[units] = 59;

      const maxTime: INotification = {
        status: 'warning',
        text: `59 is upper limit.`,
        needToShow: true,
      };

      store.dispatch(addNotifRec(maxTime));

      break;

    case !timer.minutes && timer.seconds < 10:
      timer.seconds = 10;

      const warn: INotification = {
        status: 'warning',
        text: `Timer should be at least 10 seconds.`,
        needToShow: true,
      };

      store.dispatch(notifSlice.actions.addNotifRec(warn));

      break;

    default:
  }

  return timer;
};

export default timerValidation;
