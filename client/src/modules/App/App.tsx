import React from 'react';

import '@fontsource/architects-daughter';

import { ChakraProvider, Grid, ColorModeScript } from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { ServerBoundary } from '../ServerBoundary/ServerBoundary';
import { Footer } from '../Footer/Footer';
import { theme } from '../../theme';

export const App = () => {
  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Grid minH="100vh" templateRows="50px 1fr 50px" alignItems="center">
          <ServerBoundary>
            <Header />
            <Routes />
            <Footer />
          </ServerBoundary>
        </Grid>
      </ChakraProvider>
    </>
  );
};
