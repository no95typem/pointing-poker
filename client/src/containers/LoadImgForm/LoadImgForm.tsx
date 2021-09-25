import { Button, Box, FormLabel } from '@chakra-ui/react';
import { useImgConvertor } from '../../hooks/useImgConvertor';
import { loadImg } from '../../helpers/loadImg';

interface ILoadImgForm {
  widthConvert: number;
  heightConvert: number;
}

const LoadImgForm = (props: ILoadImgForm) => {
  const convert = useImgConvertor();

  const imageChange = (): void => {
    loadImg()
      .then(src => {
        convert({ src, w: props.widthConvert, h: props.heightConvert })
          .then(base64 => {
            console.log(base64);
          })
          .catch(() => {}); // user's file is invalid, show some error
      })
      .catch(err => {
        // console.log(err);
      }); // user didn't pick a file, just ignore
  };

  return (
    <Box>
      <FormLabel mb="1rem">Image:</FormLabel>
      <Button colorScheme="facebook" onClick={imageChange}>
        Upload
      </Button>
    </Box>
  );
};

export default LoadImgForm;
