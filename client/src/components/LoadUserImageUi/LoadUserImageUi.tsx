import React from 'react';
import { Box, Button, Stack, Image } from '@chakra-ui/react';

export interface IUploadData {
  resetImage: () => void;
  uploadImage: () => void;
  src?: string;
}

const LoadUserImageUi = (props: IUploadData): JSX.Element => {
  const { resetImage, uploadImage, src } = props;

  return (
    <Box>
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        wrap="wrap"
        style={{ gap: '20px', marginBottom: '10px' }}
      >
        <Button w="130px" variant="outline" onClick={resetImage}>
          Remove Image
        </Button>

        <Button
          w="130px"
          variant="solid"
          style={{ marginInlineStart: '0' }}
          onClick={uploadImage}
        >
          Upload Image
        </Button>
      </Stack>
      {src && (
        <Box mt="10px">
          <Image m="0 auto" src={src}></Image>
        </Box>
      )}
    </Box>
  );
};

export default LoadUserImageUi;
