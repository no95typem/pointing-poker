import * as React from 'react';
import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef,
  usePrefersReducedMotion,
} from '@chakra-ui/react';

import logo from './chakra-logo.svg';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const ChakraLogo = forwardRef<ImageProps, 'img'>((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 5s linear`;

  return <chakra.img animation={animation} src={logo} ref={ref} {...props} />;
});
