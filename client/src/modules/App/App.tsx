import { useEffect } from 'react';
import '@fontsource/architects-daughter';

import { ChakraProvider, ColorModeScript, Box, Grid } from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { Footer } from '../Footer/Footer';
import { theme } from '../../theme';
import Chat from '../Chat/Сhat';
import { ServerBoundary } from '../ServerBoundary/ServerBoundary';

import './scrollbar.scss';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export const App = () => {
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];

    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    html.style.overflowX = 'hidden';
    html.style.width = '100%';
  });

  return (
    <ErrorBoundary>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <ServerBoundary>
          <Chat />
          <Grid
            h="100vh"
            w="100%"
            overflow="hidden"
            templateRows="50px 1fr 50px"
          >
            <Header />
            <Box h="100%" w="100%" overflowY="auto" overflowX="hidden">
              <Routes />
            </Box>
            <Footer />
          </Grid>
        </ServerBoundary>
      </ChakraProvider>
    </ErrorBoundary>
  );
};
