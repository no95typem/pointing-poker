import React, { useState } from 'react';
import { Button, Flex, Box, FormLabel, Avatar } from '@chakra-ui/react';
import { useImgConvertor } from '../../../../hooks/useImgConvertor';
import { useLoadImg } from '../../../../hooks/useImgLoader';

interface Props {
  user: {
    firstName: string;
    lastName: string;
    jobPosition: string;
  };
}

const AvatarForm = ({ user }: Props) => {
  const { firstName, lastName } = user;
  const [color, setColor] = useState<string>('#385898');
  const [imgSrc, setImgSrc] = useState<string>();

  const convert = useImgConvertor();
  const loadImg = useLoadImg();

  const avatarChange = (): void => {
    loadImg()
      .then(src => {
        convert({ src, w: 200, h: 200 })
          .then(base64 => {
            setImgSrc(base64);
          })
          .catch(() => {}); // user's file is invalid, show some error
      })
      .catch(() => {}); // user didn't pick a file, just ignore
  };

  const deleteAvatar = (): void => {
    setImgSrc(undefined);
  };

  return (
    <Flex direction="column" justify="space-between" alignItems="center">
      <Avatar
        name={firstName + ' ' + lastName}
        bg={color}
        size="2xl"
        src={imgSrc}
      />
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
      />
      <Box>
        <FormLabel mb="1rem">Image:</FormLabel>
        <Button colorScheme="facebook" onClick={avatarChange}>
          Upload
        </Button>
        <Button colorScheme="facebook" variant="outline" onClick={deleteAvatar}>
          Reset
        </Button>
      </Box>
    </Flex>
  );
};

export default AvatarForm;
