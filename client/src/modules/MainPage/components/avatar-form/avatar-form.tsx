import React from 'react';
import { Button, Flex, Box, FormLabel, Avatar } from '@chakra-ui/react';
import { useImgConvertor } from '../../../../hooks/useImgConvertor';
import { useLoadImg } from '../../../../hooks/useImgLoader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { userInfoSlice } from '../../../../redux/slices/userInfo';

const AvatarForm = () => {
  const dispatch = useDispatch();
  const { name, surname, avatarBase64, avatarBgColor } = useSelector(
    (state: RootState) => state.userInfo,
  );
  const { changeAvatarBase64, changeAvatarBgColor } = userInfoSlice.actions;

  const convert = useImgConvertor();
  const loadImg = useLoadImg();

  const avatarChange = (): void => {
    loadImg()
      .then(src => {
        convert({ src, w: 200, h: 200 })
          .then(base64 => {
            dispatch(changeAvatarBase64(base64));
          })
          .catch(() => {}); // user's file is invalid, show some error
      })
      .catch(() => {}); // user didn't pick a file, just ignore
  };

  const deleteAvatar = (): void => {
    dispatch(changeAvatarBase64(''));
  };

  return (
    <Flex direction="column" justify="space-between" alignItems="center">
      <Avatar
        name={name + ' ' + surname}
        bg={avatarBgColor}
        size="2xl"
        src={avatarBase64}
      />
      <input
        type="color"
        value={avatarBgColor}
        onChange={e => dispatch(changeAvatarBgColor(e.target.value))}
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
