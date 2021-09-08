import React from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  CircularProgress,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../redux/store';
import { useEffect } from 'react';
import { SERVER_ADAPTER } from '../ServerAdapter/ServerAdapter';
import { useHistory, useLocation } from 'react-router-dom';

export interface ServerBoundaryProps {
  children: React.ReactNode;
}

export const ServerBoundary = (props: ServerBoundaryProps) => {
  const history = useHistory();
  const location = useLocation();
  const toast = useToast();
  const connectState = useTypedSelector(state => state.connect);
  const sessionState = useTypedSelector(state => state.session);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (connectState.wsConnectionStatus === 'alive') {
      toast({
        title: 'Connection status',
        description: 'Succesfully connect to a server',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [connectState.wsConnectionStatus]);

  useEffect(() => {
    const path = location.pathname;

    if (sessionState.stage !== 'EMPTY') {
      if (sessionState.stage === 'LOBBY' && !path.includes('lobby'))
        history.push(`/session/${sessionState.sessionId}/lobby`);
      else if (sessionState.stage === 'GAME' && !path.includes('game'))
        history.push(`/session/${sessionState.sessionId}/game`);
      else if (sessionState.stage === 'STATS' && !path.includes('stats'))
        history.push(`/session/${sessionState.sessionId}/stats`);
    } else if (
      path.includes('lobby') ||
      path.includes('game') ||
      path.includes('stats')
    ) {
      // TODO (no95typem) start connect logic (check user data, connect to session)
    }
  }, [sessionState.stage, sessionState.sessionId, location]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (connectState.wsConnectionStatus === 'dead')
    // ! TODO (no95typem)
    return (
      <VStack>
        <Alert status="error" maxW="fit-content">
          <AlertIcon />
          Sorry, no connection to the server
        </Alert>
        <Button onClick={() => SERVER_ADAPTER.connect()}>
          Try to reconnect
        </Button>
      </VStack>
    );

  if (
    !connectState.wsConnectionStatus ||
    connectState.wsConnectionStatus === 'connecting'
  )
    return (
      <VStack>
        <Text>Please wait until connection to server will be established</Text>
        <CircularProgress isIndeterminate color="blue.400" />
      </VStack>
    );

  if (connectState.sessionConnectionStatus === 'connecting')
    return (
      <VStack>
        <Text>Connecting, please stand by...</Text>
        <CircularProgress isIndeterminate color="blue.400" />
      </VStack>
    );

  return <>{props.children}</>;
};
