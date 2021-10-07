import React, { useEffect, useState } from 'react';
import { SERVER_ADAPTER } from '../ServerAdapter/serverAdapter';

export interface ServerBoundaryProps {
  children: React.ReactNode;
}

export const ServerBoundary = (props: ServerBoundaryProps) => {
  const [executePreRender, setExecutePreRender] = useState(!FE_ALONE);

  useEffect(() => {
    if (executePreRender) {
      SERVER_ADAPTER.connect();
      setExecutePreRender(false);
    }
  }, [executePreRender]);

  return <>{executePreRender ? undefined : props.children}</>;
};
