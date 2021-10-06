import info from '../assets/sounds/info_sound.wav';
import error from '../assets/sounds/error_sound.wav';
import warning from '../assets/sounds/warning_sound.ogg';
import success from '../assets/sounds/success_sound.wav';
import message from '../assets/sounds/message_sound.wav';

import { store } from '../redux/store';

type SoundKey = 'warning' | 'info' | 'error' | 'success' | 'message';

class SystemAudio {
  private audio: HTMLAudioElement;

  private sounds: Record<SoundKey, string>;

  constructor() {
    this.audio = new Audio();

    this.sounds = {
      warning,
      info,
      error,
      success,
      message,
    };
  }

  public play(status: SoundKey): void {
    const { isMute } = store.getState().sound;

    const isPlaying =
      this.audio.src && this.audio.src !== `${window.location.origin}/`;

    if (isMute || isPlaying) return;

    this.audio.src = this.sounds[status];

    this.audio.play();

    this.audio.onended = () => {
      this.audio.src = '';
    };
  }
}

export const SYSTEM_AUDIO = new SystemAudio();
