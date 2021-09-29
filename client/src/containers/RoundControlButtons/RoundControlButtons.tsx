import { useEffect, useState } from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { ISessionGameState } from '../../../../shared/types/session/state/session-state';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import ChakraLoader from '../../components/Loader/ChakraLoader';

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

  return (
    <Stack
      position="relative"
      direction="row"
      align="center"
      justify={['space-evenly', 'space-between']}
      maxW="320px"
      mb="20px"
    >
      <Button
        colorScheme="facebook"
        w="130px"
        p="0 10px"
        variant="solid"
        visibility={
          roundState === ROUND_STATES.IN_PROCESS || isLoading
            ? 'hidden'
            : 'visible'
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
        style={{ marginInlineStart: '0' }}
        variant="solid"
        visibility={
          roundState === ROUND_STATES.AWAIT_START || isLoading
            ? 'hidden'
            : 'visible'
        }
        onClick={changeRoundState}
      >
        {roundState === ROUND_STATES.ENDED ? 'Close Issue' : 'Finish Round'}
      </Button>
      ){isLoading && <ChakraLoader />}
    </Stack>
  );
};

export default RoundControlButtons;
