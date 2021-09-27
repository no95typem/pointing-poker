import { useEffect } from 'react';
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
    const html = document.getElementsByTagName('html')[0];

    document.body.style.width = '100%';
    document.body.style.overflowX = 'hidden';
    html.style.overflowX = 'hidden';
    html.style.width = '100vw';
  });

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <ServerBoundary>
          <Grid
            minH="100vh"
            maxW="100%"
            templateRows="50px 1fr 50px"
            alignItems="center"
          >
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
