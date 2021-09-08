import React, { useState } from 'react';

import { IButton } from '../../../components/Button/buttonTypes';
import ButtonsExampleView from './ButtonsExampleView';

const ActionButtonExample = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const [isCancelling, setIsCancelling] = useState(false);

  const connectToServer = (): void => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const cancelGame = (): void => {
    setIsCancelling(true);

    setTimeout(() => {
      setIsCancelling(false);
    }, 1500);
  };

  const actionButtonData: IButton = {
    isLoading: isLoading,
    loadingText: 'Connecting...',
    width: '200px',
    text: 'Connect',
    onClick: connectToServer,
  };

  const cancelButtonData: IButton = {
    isLoading: isCancelling,
    loadingText: 'Cancelling...',
    isCofirmButton: false,
    width: '130px',
    text: 'Cancel game',
    onClick: cancelGame,
  };

  return <ButtonsExampleView data={[actionButtonData, cancelButtonData]} />;
};

export default ActionButtonExample;
