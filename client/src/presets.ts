import { CardData } from '../../shared/types/session/card';

import faqMod from './assets/images/undraw/faq-mod.svg';
import pizzaSharing from './assets/images/undraw/pizza-sharing.svg';
import missionImpossible from './assets/images/undraw/mission-impossible.svg';

import logo from './assets/images/shared/logo.svg';
import rssLogo from './assets/images/shared/rss-logo.svg';
import back01 from './assets/images/card-back-01.png';
import back02 from './assets/images/card-back-02.png';

export const CARDS_DECKS: Record<string, CardData[]> = {
  FIBONACCI: [
    { value: '0' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '5' },
    { value: '8' },
    { value: '13' },
    { value: '21' },
    { value: '34' },
    { value: '55' },
    { value: '89' },
    { value: 'Unsure', base64: faqMod },
    { value: 'We need a break', base64: pizzaSharing },
    { value: 'Impossible', base64: missionImpossible },
  ],
  POWERS_OF_TWO: [
    { value: '0' },
    { value: '1' },
    { value: '2' },
    { value: '4' },
    { value: '8' },
    { value: '16' },
    { value: '32' },
    { value: '64' },
    { value: '128' },
    { value: '256' },
    { value: '512' },
    { value: 'Unsure', base64: faqMod },
    { value: 'We need a break', base64: pizzaSharing },
  ],
  LIKE_A_PHYSICAL_DECK: [
    { value: '0' },
    { value: '1/2' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '5' },
    { value: '8' },
    { value: '13' },
    { value: '20' },
    { value: '40' },
    { value: '100' },
    { value: 'I do not know', base64: faqMod },
    { value: 'We need a break', base64: pizzaSharing },
  ],
};

export const CARDS_BACKS = [back01, back02, rssLogo, logo];
