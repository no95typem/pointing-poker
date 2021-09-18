import { Button, Flex, Box, FormLabel, Avatar } from '@chakra-ui/react';
import { useImgConvertor } from '../../../../hooks/useImgConvertor';
import { useLoadImg } from '../../../../hooks/useImgLoader';
import { useTypedSelector, useAppDispatch } from '../../../../redux/store';
import {
  changeAvatarBase64,
  changeAvatarBgColor,
} from '../../../../redux/slices/userInfo';
import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../../../../constants';

const AvatarForm = () => {
  const dispatch = useAppDispatch();
  const { name, surname, avatarBase64, avatarBgColor } = useTypedSelector(
    state => state.userInfo,
  );

  const convert = useImgConvertor();
  const loadImg = useLoadImg();

  const avatarChange = (): void => {
    loadImg()
      .then(src => {
        convert({ src, w: AVATAR_WIDTH, h: AVATAR_HEIGHT })
          .then(base64 => {
            dispatch(changeAvatarBase64(base64));
          })
          .catch(() => {}); // user's file is invalid, show some error
      })
      .catch(err => {
        // console.log(err);
      }); // user didn't pick a file, just ignore
  };

  const deleteAvatar = (): void => {
    dispatch(changeAvatarBase64(''));
  };

  return (
    <Flex direction="column" justify="space-between" alignItems="center">
      <Avatar
        name={`${name} ${surname}`}
        bg={avatarBgColor}
        size="2xl"
        src={avatarBase64}
        color="white"
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
