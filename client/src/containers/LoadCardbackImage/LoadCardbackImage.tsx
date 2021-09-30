import React from 'react';
import { useImgConvertor } from '../../hooks/useImgConvertor';
import { loadImg } from '../../helpers/loadImg';

import LoadUserImageUi, {
  IUploadData,
} from '../../components/LoadUserImageUi/LoadUserImageUi';
import { ILoadImgForm } from '../LoadCardCustomImage/LoadCardCustomImage';
import { ICardBackData } from '../../components/CardbackModal/CardbackModal';
import { INotification, notifSlice } from '../../redux/slices/notifications';
import { store } from '../../redux/store';

export interface ILoadCardbackParams {
  imgParams: ILoadImgForm;
  cardback: ICardBackData;
}

const LoadCardbackImage = (props: ILoadCardbackParams) => {
  const { imgParams, cardback } = props;

  const { activeCardback, setActiveCardback } = cardback;

  const convert = useImgConvertor();

  const { width, height } = imgParams;

  const uploadImage = (): void => {
    loadImg()
      .then(src => {
        convert({ src, w: width, h: height })
          .then(base64 => {
            setActiveCardback(base64);
          })
          .catch(() => {
            const notification: INotification = {
              status: 'error',
              text: 'Unreadable Format',
              needToShow: true,
            };

            store.dispatch(notifSlice.actions.addNotifRec(notification));
          });
      })
      .catch(() => {
        const notification: INotification = {
          status: 'error',
          text: 'Unreadable Format',
          needToShow: true,
        };

        store.dispatch(notifSlice.actions.addNotifRec(notification));
      });
  };
  const resetImage = (): void => {
    setActiveCardback('');
  };

  const imageUploadData: IUploadData = {
    uploadImage,
    resetImage,
    src: activeCardback,
  };

  return <LoadUserImageUi {...imageUploadData} />;
};

export default LoadCardbackImage;
