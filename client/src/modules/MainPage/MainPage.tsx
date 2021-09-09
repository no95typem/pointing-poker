import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
// import * as UI from "@chakra-ui/react";
import Page from './components/page/page';
import Popup from './components/popup/popup';

const MainPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const open = () => onOpen();
  const close = () => onClose();

  return (
    <>
      <Page open={open} />
      <Popup isOpen={isOpen} close={close} />
    </>
  );
};

export default MainPage;
