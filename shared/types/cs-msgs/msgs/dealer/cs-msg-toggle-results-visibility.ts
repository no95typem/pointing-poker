import { CSMsg } from '../../cs-msg';
import { CSMSG_CIPHERS } from '../../cs-msg-ciphers';

export class CSMSgToggleResultsVisibility implements CSMsg {
  readonly cipher = CSMSG_CIPHERS.TOGGLE_RESULTS_VISIBILITY;

  constructor(readonly setIsVisible: boolean) {}
}
