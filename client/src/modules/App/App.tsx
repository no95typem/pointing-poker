import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  ColorModeScript,
} from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { ServerBoundary } from '../ServerBoundary/ServerBoundary';

export const App = () => {
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
