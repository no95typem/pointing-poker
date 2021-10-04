import { useState } from 'react';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import {
  IConfirmation,
  IGameStateData,
} from '../../../../shared/types/session/state/session-state';

import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const GameControlButtons = (props: IGameStateData): JSX.Element => {
  const { isPlayerDealer, gameData } = props;

  const { isGameStage } = gameData;

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
        description: isGameStage ? 'Finish Game' : 'Start Game',
        action: isGameStage ? SERVER_ADAPTER.endGame : SERVER_ADAPTER.startGame,
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
    <Flex align="center" justify="space-between" wrap="wrap" gridGap={2}>
      <Button w="130px" variant="outline" onClick={leaveGameConfirmation}>
        {isPlayerDealer ? 'Cancel Game' : 'Leave Game'}
      </Button>
      {isPlayerDealer && (
        <Button
          w="130px"
          border="1px solid black"
          variant="solid"
          style={{ marginInlineStart: '0' }}
          visibility={isPlayerDealer ? 'visible' : 'hidden'}
          onClick={changeGameModeConfirmation}
        >
          {isGameStage ? 'Finish Game' : 'Start Game'}
        </Button>
      )}
      <ConfirmationModal {...confirmModalData} />
    </Flex>
  );
};

export default GameControlButtons;
