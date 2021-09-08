import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  ColorModeScript,
} from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { SERVER_ADAPTER } from '../ServerAdapter/ServerAdapter';
import { ServerBoundary } from '../ServerBoundary/ServerBoundary';

export const App = () => {
  useEffect(() => {
    SERVER_ADAPTER.connect()
      .then(result => {})
      .catch(reason => {});
  }, []);

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <Header />
            <ServerBoundary>
              <Routes />
            </ServerBoundary>
          </Grid>
        </Box>
      </ChakraProvider>
    </>
  );
};
