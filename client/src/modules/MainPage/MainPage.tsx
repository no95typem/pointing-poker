import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
// import * as UI from "@chakra-ui/react";
import Page from './components/page/page';
import Popup from './components/popup/popup';

const MainPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dealer, setDealer] = useState(false);

  const open = (name: string) => {
    if (name) {
      setDealer(true);
      onOpen();
    } else {
      setDealer(false);
      onOpen();
    }
  };
  const close = () => onClose();

  return (
    <>
      <Page open={open} />
      <Popup isOpen={isOpen} close={close} dealer={dealer} />
    </>
  );
};

export default MainPage;
