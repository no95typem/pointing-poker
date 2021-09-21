import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { CSMsgStartRound } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-start-round';
import { CSMsgStopRound } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-stop-round';
import { ISessionGameState } from '../../../../shared/types/session/state/session-state';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import { CSMsgNextIssue } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-next-issue';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';

const RoundControlButtons = (props: ISessionGameState): JSX.Element => {
  const { roundState } = props;

  const startRound = (): void => {
    const roundStart = new CSMsgStartRound();

    SERVER_ADAPTER.send(roundStart);
  };

  const stopRound = (): void => {
    const roundStop = new CSMsgStopRound();

    SERVER_ADAPTER.send(roundStop);
  };

  const nextRound = (): void => {
    console.log('next round');

    const nextIssue = new CSMsgNextIssue();

    SERVER_ADAPTER.send(nextIssue);
  };

  const changeRoundState = (): void => {
    if (roundState === ROUND_STATES.IN_PROCESS) {
      stopRound();
    } else {
      nextRound();
    }
  };

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      maxW="280px"
      mb="20px"
    >
      <Button
        colorScheme="facebook"
        w="130px"
        p="0 10px"
        variant="solid"
        visibility={
          roundState === ROUND_STATES.IN_PROCESS ? 'hidden' : 'visible'
        }
        onClick={startRound}
      >
        {roundState === ROUND_STATES.AWAIT_START
          ? 'Run Round'
          : 'Restart Round'}
      </Button>
      (
      <Button
        colorScheme="facebook"
        w="130px"
        p="0 10px"
        variant="solid"
        visibility={
          roundState === ROUND_STATES.AWAIT_START ? 'hidden' : 'visible'
        }
        onClick={changeRoundState}
      >
        {roundState === ROUND_STATES.ENDED ? ' Next Issue' : 'End Round'}
      </Button>
      )
    </Stack>
  );
};

export default RoundControlButtons;
