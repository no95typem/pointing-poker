import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/architects-daughter';

import { ChakraProvider, Grid, ColorModeScript } from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { ServerBoundary } from '../ServerBoundary/ServerBoundary';
import { Footer } from '../Footer/Footer';
import { theme } from '../../theme';
import { useTypedSelector } from '../../redux/store';
import Chat from '../Chat/сhat';

export const App = () => {
  const { isVisible } = useTypedSelector(state => state.chatVisible);
  const el = document.createElement('div');

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Grid minH="100vh" templateRows="50px 1fr 50px" alignItems="center">
          <ServerBoundary>
            <Header />
            {isVisible ? ReactDOM.createPortal(<Chat />, el) : <></>}
            {isVisible ? <Chat /> : <></>}
            <Routes />
            <Footer />
          </ServerBoundary>
        </Grid>
      </ChakraProvider>
    </>
  );
};
