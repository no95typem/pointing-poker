import React from 'react';

import { Button, HStack, Image, Input, Text, VStack } from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/store';
import { connectToLobby, createSession } from '../../redux/slices/connect';
import { useState } from 'react';
import { useImgConvertor } from '../../hooks/useImgConvertor';
import { useLoadImg } from '../../hooks/useImgLoader';

export const Root = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [imgSrc, setImgSrc] = useState<string>();
  const [fullImgSrc, setFullImgSrc] = useState<string>();

  const convert = useImgConvertor();
  const loadImg = useLoadImg();

  const [sessionId, setSessionId] = useState<string>('');

  return (
    <VStack>
      <Text>I'm start(root) page</Text>
      <Button onClick={() => dispatch(createSession())}>
        try to create new session
      </Button>
      <Button
        onClick={() => {
          loadImg()
            .then(src => {
              setFullImgSrc(src);
              convert({ src, w: 200, h: 200 })
                .then(base64 => {
                  setImgSrc(base64);
                })
                .catch(() => {}); // user's file is invalid, show some error
            })
            .catch(() => {}); // user didn't pick a file, just ignore
        }}
      >
        test img loader
      </Button>
      <Input
        type="text"
        value={sessionId}
        onChange={e => setSessionId(e.target.value)}
      />
      <Button onClick={() => dispatch(connectToLobby())}>
        Connect to session
      </Button>
      <HStack>
        <Image src={fullImgSrc} maxW="600px" maxH="300px" />
        <Image src={imgSrc} maxW="600px" maxH="300px" />
      </HStack>
    </VStack>
  );
};
