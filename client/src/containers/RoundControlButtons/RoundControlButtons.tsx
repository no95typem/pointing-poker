import { useEffect, useState } from 'react';

import { ISessionGameState } from '../../../../shared/types/session/state/session-state';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';

import ButtonsSet, {
  IButtonData,
  IButtonsSetData,
} from '../../components/ButtonsSet/ButtonsSet';

const RoundControlButtons = (props: ISessionGameState): JSX.Element => {
  const { roundState } = props;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [roundState]);

  const startRound = (): void => {
    setIsLoading(true);

    SERVER_ADAPTER.startRound();
  };

  const stopRound = (): void => {
    SERVER_ADAPTER.stopRound();
  };

  const nextRound = (): void => {
    SERVER_ADAPTER.nextIssue();
  };

  const changeRoundState = (): void => {
    if (roundState === ROUND_STATES.IN_PROCESS) {
      stopRound();
    } else {
      nextRound();
    }
    setIsLoading(true);
  };

  const first: IButtonData = {
    isHidden: roundState === ROUND_STATES.IN_PROCESS || isLoading,
    onClick: startRound,
    text:
      roundState === ROUND_STATES.AWAIT_START ? 'Run Round' : 'Restart Round',
  };

  const second: IButtonData = {
    isHidden: roundState === ROUND_STATES.AWAIT_START || isLoading,
    onClick: changeRoundState,
    text: roundState === ROUND_STATES.ENDED ? 'Close Issue' : 'Finish Round',
  };

  const buttonsData: IButtonsSetData = {
    first,
    second,
    isLoading,
  };

  return <ButtonsSet {...buttonsData} />;
};

export default RoundControlButtons;
