import {
  Box,
  CircularProgress,
  keyframes,
  Text,
  usePrefersReducedMotion,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as UndrawMovingForward } from '../../../../assets/images/undraw/moving-forward.svg';
import { ReactComponent as UndrawProcessingThoughts } from '../../../../assets/images/undraw/processing-thoughts.svg';

const easeInOpacity = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export interface GenericLoadPageProps {
  text: string;
}

export const GenericLoadPage = React.memo(
  (props: GenericLoadPageProps): JSX.Element => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const animation = prefersReducedMotion
      ? undefined
      : `${easeInOpacity} 1s linear 0.2s 1 normal forwards`;

    const illustration =
      Math.random() > 0.6 ? (
        <UndrawMovingForward />
      ) : (
        <UndrawProcessingThoughts />
      );

    return (
      <VStack gridGap="2" animation={animation} opacity="0">
        <Box w="400px" maxW="60%">
          {illustration}
        </Box>
        <Text fontSize="lg" fontStyle="italic">
          {props.text}
        </Text>
        <CircularProgress isIndeterminate color="gray.400" size="80px" />
      </VStack>
    );
  },
);

//Please wait until connection to server will be established
