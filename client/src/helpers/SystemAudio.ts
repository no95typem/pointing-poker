import info from '../assets/sounds/info_sound.wav';
import error from '../assets/sounds/error_sound.wav';
import warning from '../assets/sounds/warning_sound.ogg';
import success from '../assets/sounds/success_sound.wav';
import message from '../assets/sounds/message_sound.wav';

import { store } from '../redux/store';

type SoundKey = 'warning' | 'info' | 'error' | 'success' | 'message';

class SystemAudio {
  private audios: Record<SoundKey, HTMLAudioElement>;

  constructor() {
    this.audios = {
      warning: new Audio(warning),
      info: new Audio(info),
      error: new Audio(error),
      success: new Audio(success),
      message: new Audio(message),
    };
  }

  public play(key: SoundKey): void {
    const { isMute } = store.getState().sound;

    if (!isMute) {
      const audio = this.audios[key];
      audio.currentTime = 0;
      audio.play().catch();
    }
  }
}

export const SYSTEM_AUDIO = new SystemAudio();
