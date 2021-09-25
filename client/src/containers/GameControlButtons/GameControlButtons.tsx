import React, { useState } from 'react';

import {
  Button,
  Stack,
  useControllableState,
  useDisclosure,
} from '@chakra-ui/react';

import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import {
  IConfirmation,
  IGameStateData,
} from '../../../../shared/types/session/state/session-state';
import { CSMsgEndGame } from '../../../../shared/types/cs-msgs/msgs/dealer/cs-msg-end-game';

import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const GameControlButtons = (props: IGameStateData): JSX.Element => {
  const { isPlayerDealer, setGameSettings, localSettings, gameData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeGameModeConfirmation = (): void => {
    setTempConfirmData({
      ...tempConfirmData,
      description: gameData.isGameStage ? 'Finish Game' : 'Start Game',
      action: gameData.isGameStage ? finishGame : initiateGame,
    });

    onOpen();
  };

  const leaveGameConfirmation = (): void => {
    setTempConfirmData({
      ...tempConfirmData,
      description: isPlayerDealer ? 'Cancel Game' : 'Leave Game',
      action: SERVER_ADAPTER.exitGame,
    });

    onOpen();
  };

  const initiateGame = (): void => {
    localSettings && setGameSettings(localSettings);

    SERVER_ADAPTER.startGame();
  };

  const finishGame = (): void => {
    const endGame = new CSMsgEndGame();

    SERVER_ADAPTER.send(endGame);
  };

  const [confirmData, setConfirmData] = useState({
    description: '',
    action: initiateGame,
    isOpen,
    onClose,
  });

  const [tempConfirmData, setTempConfirmData] =
    useControllableState<IConfirmation>({
      value: confirmData,
      onChange: setConfirmData,
    });

  // useEffect(() => {
  //   console.log(1);

  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;

  //     return;
  //   }

  //   onOpen();
  // }, [confirmData.action, onOpen]);

  return (
    <Stack direction="row" align="center" justify="space-between">
      <Button
        colorScheme="facebook"
        w="130px"
        variant="outline"
        onClick={leaveGameConfirmation}
      >
        {isPlayerDealer ? 'Cancel Game' : 'Leave Game'}
      </Button>
      {isPlayerDealer && (
        <Button
          colorScheme="facebook"
          w="130px"
          variant="solid"
          visibility={isPlayerDealer ? 'visible' : 'hidden'}
          onClick={changeGameModeConfirmation}
        >
          {gameData.isGameStage ? 'Finish Game' : 'Start Game'}
        </Button>
      )}
      <ConfirmationModal {...tempConfirmData} />
    </Stack>
  );
};

export default GameControlButtons;
