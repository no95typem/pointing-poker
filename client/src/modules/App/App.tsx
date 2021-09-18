import React from 'react';
import '@fontsource/architects-daughter';

import {
  ChakraProvider,
  Grid,
  ColorModeScript,
  Portal,
} from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { ServerBoundary } from '../ServerBoundary/ServerBoundary';
import { Footer } from '../Footer/Footer';
import { theme } from '../../theme';
import { useTypedSelector } from '../../redux/store';
import Chat from '../Chat/сhat';

export const App = () => {
  const { isVisible } = useTypedSelector(state => state.chat);

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Grid minH="100vh" templateRows="50px 1fr 50px" alignItems="center">
          <ServerBoundary>
            <Header />
            {isVisible && (
              <Portal>
                <Chat />
              </Portal>
            )}
            <Routes />
            <Footer />
          </ServerBoundary>
        </Grid>
      </ChakraProvider>
    </>
  );
};
