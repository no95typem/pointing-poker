import React from 'react';
import { useImgConvertor } from '../../hooks/useImgConvertor';
import { loadImg } from '../../helpers/loadImg';
import { IActiveCard } from '../../../../shared/types/session/card';
import LoadUserImageUi, {
  IUploadData,
} from '../../components/LoadUserImageUi/LoadUserImageUi';

export interface ILoadImgForm {
  width: number;
  height: number;
}

export interface ILoadCardImgParams {
  imgParams: ILoadImgForm;
  card: IActiveCard;
  units?: string;
}

const LoadCardCustomImage = (props: ILoadCardImgParams) => {
  const { imgParams, card } = props;

  const convert = useImgConvertor();

  const { width, height } = imgParams;

  const { changeCardValue, activeCard } = card;

  const { base64 } = activeCard;

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

  const imageUploadData: IUploadData = {
    uploadImage,
    resetImage,
    src: base64,
    cardData: activeCard,
  };

  return <LoadUserImageUi {...imageUploadData} />;
};

export default LoadCardCustomImage;
