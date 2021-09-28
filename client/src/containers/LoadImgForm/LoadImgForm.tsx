import React from 'react';
import { Box, Button, Image, Stack } from '@chakra-ui/react';
import { useImgConvertor } from '../../hooks/useImgConvertor';
import { loadImg } from '../../helpers/loadImg';
import { CardData } from '../../../../shared/types/session/card';

export interface ILoadImgForm {
  width: number;
  height: number;
}

export interface ILoadImgParams {
  imgParams: ILoadImgForm;
  activeCard: CardData;
  changeCardValue: (card: CardData) => void;
}

const LoadImgForm = (props: ILoadImgParams) => {
  const { imgParams, changeCardValue, activeCard } = props;

  const { base64 } = activeCard;

  const { width, height } = imgParams;

  const convert = useImgConvertor();

  const uploadImage = (): void => {
    loadImg()
      .then(src => {
        convert({ src, w: width, h: height })
          .then(base64 => {
            changeCardValue({ ...activeCard, base64: base64 });
          })
          .catch();
      })
      .catch();
  };

  const resetImage = (): void => {
    changeCardValue({ ...activeCard, base64: '' });
  };

  return (
    <Box>
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        wrap="wrap"
        style={{ gap: '20px', marginBottom: '10px' }}
      >
        <Button
          colorScheme="facebook"
          w="130px"
          variant="outline"
          onClick={resetImage}
        >
          Remove Image
        </Button>

        <Button
          colorScheme="facebook"
          w="130px"
          variant="solid"
          style={{ marginInlineStart: '0' }}
          onClick={uploadImage}
        >
          Upload Image
        </Button>
      </Stack>
      {base64 && (
        <Box mt="10px">
          <Image m="0 auto" src={base64}></Image>
        </Box>
      )}
    </Box>
  );
};

export default LoadImgForm;
