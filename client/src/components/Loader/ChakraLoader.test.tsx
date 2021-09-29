import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChakraLoader from './ChakraLoader';

it('ChakraLoader', () => {
  const { getByText } = render(<ChakraLoader />);
  expect(getByText('Loading...')).toBeTruthy();
  expect(getByText('Loading...')).toHaveStyle('position: absolute');
});
