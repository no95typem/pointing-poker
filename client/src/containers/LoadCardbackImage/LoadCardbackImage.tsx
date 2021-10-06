import { useImgConvertor } from '../../hooks/useImgConvertor';
import { loadImg } from '../../helpers/loadImg';

import LoadUserImageUi, {
  IUploadData,
} from '../../components/LoadUserImageUi/LoadUserImageUi';
import { ILoadImgForm } from '../LoadCardCustomImage/LoadCardCustomImage';
import { ICardBackData } from '../../components/CardbackModal/CardbackModal';
import { INotification, addNotifRec } from '../../redux/slices/notifications';
import { store } from '../../redux/store';

export interface ILoadCardbackParams {
  imgParams: ILoadImgForm;
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

  const uploadImage = (): void => {
    loadImg()
      .then(src => {
        const image = new Image();
        image.src = src.slice();
        image.onerror = notifyError;
        image.onload = () => {
          const realW = image.width;

          // 150px - max width of the gamecard!
          convert({ src, w: 0, h: 0, scale: 150 / realW })
            .then(base64 => {
              setActiveCardback(base64);
            })
            .catch(notifyError);
        };
      })
      .catch(notifyError);
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
