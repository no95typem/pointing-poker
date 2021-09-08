import React from 'react';
import { useConnectionStatusToast } from '../../hooks/useConnectionStatusToast';
import { useRouterController } from '../../hooks/useRouterController';

export interface ServerBoundaryProps {
  children: React.ReactNode;
}

export const ServerBoundary = (props: ServerBoundaryProps) => {
  useConnectionStatusToast();
  useRouterController();
  // if (
  //   !connectState.wsConnectionStatus ||
  //   connectState.wsConnectionStatus === 'connecting'
  // ) history.push

  // if (connectState.sessionConnectionStatus === 'connecting')
  //   return (
  //     <VStack>
  //       <Text>Connecting, please stand by...</Text>
  //       <CircularProgress isIndeterminate color="blue.400" />
  //     </VStack>
  //   );

  return <>{props.children}</>;
};
