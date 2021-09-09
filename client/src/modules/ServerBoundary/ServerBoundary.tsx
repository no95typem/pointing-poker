import React, { useEffect } from 'react';
import { useConnectionStatusToast } from '../../hooks/useConnectionStatusToast';
import { useRouterController } from '../../hooks/useRouterController';
import { SERVER_ADAPTER } from '../ServerAdapter/ServerAdapter';

export interface ServerBoundaryProps {
  children: React.ReactNode;
}

export const ServerBoundary = (props: ServerBoundaryProps) => {
  useConnectionStatusToast();
  useRouterController();

  useEffect(() => {
    !FE_ALONE && SERVER_ADAPTER.connect();
  }, []);

  return <>{props.children}</>;
};
