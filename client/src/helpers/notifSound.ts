import { store } from '../redux/store';
import { audioPlay } from './audioPlay';
import info from '../assets/sounds/info_sound.wav';
import error from '../assets/sounds/error_sound.wav';
import warning from '../assets/sounds/warning_sound.ogg';
import success from '../assets/sounds/success_sound.wav';

export const notifSound = (status: string) => {
  const { isMute } = store.getState().sound;

  if (!isMute) {
    switch (status) {
      case 'error':
        audioPlay(error);
        break;
      case 'info':
        audioPlay(info);
        break;
      case 'success':
        audioPlay(success);
        break;
      case 'warning':
        audioPlay(warning);
        break;
    }
  }
};
