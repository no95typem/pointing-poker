import React, { useEffect } from 'react';
import '@fontsource/architects-daughter';

import { ChakraProvider, Grid, ColorModeScript } from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { Footer } from '../Footer/Footer';
import { theme } from '../../theme';
import Chat from '../Chat/Сhat';
import { ServerBoundary } from '../ServerBoundary/ServerBoundary';

export const App = () => {
  useEffect(() => {
    document.body.style.width = '100%';
    document.body.style.overflowX = 'hidden';
  });

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <ServerBoundary>
          <Grid minH="100vh" templateRows="50px 1fr 50px" alignItems="center">
            <Header />
            <Routes />
            <Footer />
            <Chat />
          </Grid>
        </ServerBoundary>
      </ChakraProvider>
    </>
  );
};
