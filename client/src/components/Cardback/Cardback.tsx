import { Box, Flex, Image, useColorMode } from '@chakra-ui/react';
import { useRef } from 'react';
import { useState } from 'react';
import { CARDS_BACKS } from '../../presets';

interface ICardback {
  src?: string;
  size?: 'xs' | 'xl';
}

const Cardback = (props: ICardback): JSX.Element => {
  const { size, src } = props;

  const boxSizeStyles =
    size === 'xs'
      ? {
          w: '40px',
          height: '56px',
          borderRadius: 'md',
        }
      : {
          w: '150px',
          height: '210px',
          borderRadius: 'xl',
        };

  const ref = useRef<HTMLImageElement>(null!);

  const [isBorder, setIsBorder] = useState(false);

  const recalcStyles = () => {
    try {
      const boxRatio =
        Number.parseFloat(boxSizeStyles.w) /
        Number.parseFloat(boxSizeStyles.height);
      const imgRatio = ref.current.naturalWidth / ref.current.naturalHeight;

      const needBorder = Math.abs(boxRatio - imgRatio) > 0.2;

      if (needBorder !== isBorder) setIsBorder(needBorder);
    } catch (err) {
      console.error(err);
    }
  };

  const cMode = useColorMode();

  const boxBorderStyles = isBorder
    ? {
        border: '1px solid',
        borderColor: cMode.colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.200',
        padding: '10%',
        bg: cMode.colorMode === 'light' ? 'gray.200' : 'gray.700',
      }
    : {};

  return (
    <Flex
      justify="center"
      align="center"
      overflow="hidden"
      {...boxSizeStyles}
      {...boxBorderStyles}
      className={isBorder ? 'enlight' : undefined}
    >
      <Box
        maxH="100%"
        maxW="100%"
        display="block"
        className={!isBorder ? 'enlight' : undefined}
      >
        <Image
          onLoad={recalcStyles}
          src={src || CARDS_BACKS[3]}
          ref={ref}
          maxH="100%"
          maxW="100%"
          objectFit="contain"
          z-index="0"
          borderRadius={isBorder ? 'enlight' : undefined}
        />
      </Box>
    </Flex>
  );
};

export default Cardback;
