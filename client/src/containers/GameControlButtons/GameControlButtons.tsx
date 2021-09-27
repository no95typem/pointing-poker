import React, { useState } from 'react';

import { Button, Stack, useDisclosure } from '@chakra-ui/react';

import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import {
  IConfirmation,
  IGameStateData,
} from '../../../../shared/types/session/state/session-state';

import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const GameControlButtons = (props: IGameStateData): JSX.Element => {
  const { isPlayerDealer, gameData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [confirmData, setConfirmData] = useState({
    description: '',
    action: () => {},
  });

  const confirmModalData: IConfirmation = {
    isOpen,
    onClose,
    confirmData,
  };

  const changeGameModeConfirmation = (): void => {
    setConfirmData(prevState => {
      return {
        ...prevState,
        description: gameData.isGameStage ? 'Finish Game' : 'Start Game',
        action: gameData.isGameStage
          ? SERVER_ADAPTER.endGame
          : SERVER_ADAPTER.startGame,
      };
    });

    onOpen();
  };

  const leaveGameConfirmation = (): void => {
    setConfirmData(prevState => {
      return {
        ...prevState,
        description: isPlayerDealer ? 'Cancel Game' : 'Leave Game',
        action: SERVER_ADAPTER.exitGame,
      };
    });

    onOpen();
  };

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
      <ConfirmationModal {...confirmModalData} />
    </Stack>
  );
};

export default GameControlButtons;
