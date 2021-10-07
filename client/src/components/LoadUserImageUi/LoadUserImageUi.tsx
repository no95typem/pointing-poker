import { Button, Checkbox, Flex } from '@chakra-ui/react';
import GameCard from '../GameCard/GameCard';
import Cardback from '../Cardback/Cardback';
import { CardData } from '../../../../shared/types/session/card';

export interface IUploadData {
  resetImage: () => void;
  uploadImage: () => void;
  src?: string;
  cover?: boolean;
  onToggleCover?: () => void;
  cardData?: CardData;
  units?: string;
}

const LoadUserImageUi = (props: IUploadData): JSX.Element => {
  const {
    cover,
    resetImage,
    uploadImage,
    src,
    onToggleCover,
    cardData,
    units,
  } = props;

  return (
    <Flex direction="column" w="100%" align="center" gridGap={4}>
      <Flex gridGap={2}>
        <Button w="130px" variant="outline" onClick={resetImage}>
          Remove Image
        </Button>
        <Button
          w="130px"
          variant="solid"
          border="1px solid black"
          style={{ marginInlineStart: '0' }}
          onClick={uploadImage}
        >
          Upload Image
        </Button>
      </Flex>
      {onToggleCover && (
        <Checkbox isChecked={cover} onChange={onToggleCover} size="lg">
          Cover
        </Checkbox>
      )}
      {cardData ? (
        <GameCard card={cardData} units={units || ''} />
      ) : (
        <Cardback src={src} />
      )}
    </Flex>
  );
};

export default LoadUserImageUi;
