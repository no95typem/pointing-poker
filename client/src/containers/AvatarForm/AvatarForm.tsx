import { Flex, Box, Avatar, IconButton } from '@chakra-ui/react';
import { useImgConvertor } from '../../hooks/useImgConvertor';
import { loadImg } from '../../helpers/loadImg';
import { useTypedSelector, useAppDispatch } from '../../redux/store';
import {
  changeAvatarBase64,
  changeAvatarBgColor,
} from '../../redux/slices/userInfo';
import { AVATAR_HEIGHT, AVATAR_WIDTH } from '../../constants';
import { FaPaintRoller, FaTrash, FaUpload } from 'react-icons/fa';
import { useRef } from 'react';

const AvatarForm = () => {
  const dispatch = useAppDispatch();
  const { name, surname, avatarBase64, avatarBgColor } = useTypedSelector(
    state => state.userInfo,
  );

  const convert = useImgConvertor();

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
        console.error(err);
      }); // user didn't pick a file, just ignore
  };

  const deleteAvatar = (): void => {
    dispatch(changeAvatarBase64(''));
  };

  const ref = useRef<HTMLInputElement>(null!);

  return (
    <Flex
      direction="column"
      justifyItems="center"
      alignItems="center"
      h="fit-content"
      gridGap="4"
    >
      <Avatar
        name={`${name} ${surname}`}
        bg={avatarBgColor}
        w={AVATAR_WIDTH}
        h={AVATAR_HEIGHT}
        src={avatarBase64}
        colorScheme="teal"
        size="2xl"
        style={{ textShadow: '1px 1px #000000' }}
      />
      <Flex gridGap="4" alignSelf="center">
        <IconButton
          aria-label="upload an avatar"
          icon={<FaUpload />}
          onClick={avatarChange}
          style={{ marginInlineStart: '0px' }}
        />
        <IconButton
          aria-label="upload an avatar"
          icon={<FaTrash />}
          onClick={deleteAvatar}
          disabled={avatarBase64 === ''}
          _disabled={{ opacity: '0.3' }}
          style={{ marginInlineStart: '0px' }}
        >
          Reset the image
        </IconButton>
        <Box>
          <IconButton
            aria-label="open pallete"
            icon={<FaPaintRoller />}
            // bg={avatarBgColor}
            onClick={() =>
              ref.current?.dispatchEvent(
                new MouseEvent('click', { cancelable: false }),
              )
            }
          ></IconButton>
          <input
            style={{ display: 'block', width: '0px', height: '0px' }}
            ref={ref}
            type="color"
            value={avatarBgColor}
            onChange={e => dispatch(changeAvatarBgColor(e.target.value))}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AvatarForm;
