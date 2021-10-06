import { useImgConvertor } from '../../hooks/useImgConvertor';
import { loadImg } from '../../helpers/loadImg';

import LoadUserImageUi, {
  IUploadData,
} from '../../components/LoadUserImageUi/LoadUserImageUi';
import { ICardBackData } from '../../components/CardbackModal/CardbackModal';
import { INotification, addNotifRec } from '../../redux/slices/notifications';
import { store } from '../../redux/store';
import { useEffect, useState } from 'react';

export interface ILoadCardbackParams {
  cardback: ICardBackData;
}

const notifyError = () => {
  const notification: INotification = {
    status: 'error',
    text: 'Unreadable Format',
    needToShow: true,
  };

  store.dispatch(addNotifRec(notification));
};

const LoadCardbackImage = (props: ICardBackData) => {
  const { activeCardback, setActiveCardback } = props;

  const convert = useImgConvertor();

  const [cover, setCover] = useState(true);

  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  useEffect(() => {
    if (image) {
      // 148px - max width of the gamecard! 208 - height
      const scale = cover ? undefined : 148 / image.width;

      convert({ src: image.src, w: 148, h: 208, scale })
        .then(base64 => {
          setActiveCardback(base64);
        })
        .catch(notifyError);
    }
  }, [image, cover, convert, setActiveCardback]);

  const uploadImage = (): void => {
    loadImg()
      .then(src => {
        const image = new Image();
        image.src = src.slice();
        image.onerror = notifyError;
        image.onload = () => setImage(image);
      })
      .catch(notifyError);
  };
  const resetImage = (): void => {
    setImage(undefined);
    setActiveCardback('');
  };

  const imageUploadData: IUploadData = {
    uploadImage,
    resetImage,
    src: activeCardback,
    onToggleCover: () => setCover(!cover),
    cover,
  };

  return <LoadUserImageUi {...imageUploadData} />;
};

export default LoadCardbackImage;
