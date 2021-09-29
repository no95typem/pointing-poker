import { useEffect } from 'react';
import '@fontsource/architects-daughter';

import { ChakraProvider, ColorModeScript, Box, Flex } from '@chakra-ui/react';
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
    html.style.width = '100%';
  });

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <ServerBoundary>
          <Flex
            h="100vh"
            w="100%"
            overflow="hidden"
            alignItems="center"
            direction="column"
          >
            <Box h="50px" w="100%">
              <Header />
            </Box>
            <Box h="calc(100% - 100px)" w="100%">
              <Routes />
            </Box>
            <Box h="50px" w="100%">
              <Footer />
            </Box>
            <Chat />
          </Flex>
        </ServerBoundary>
      </ChakraProvider>
    </>
  );
};
