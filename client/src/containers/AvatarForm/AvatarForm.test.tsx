import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import AvatarForm from './AvatarForm';

declare global {
  namespace NodeJS {
    interface Global {
      TARGET_PLATFORM: string;
      IS_PROD: boolean;
      FE_ALONE: boolean;
      BASENAME: string | undefined;
    }
  }
}

describe('AvatarForm', () => {
  const node = (
    <Provider store={store}>
      <BrowserRouter basename={BASENAME}>
        <AvatarForm />
      </BrowserRouter>
    </Provider>
  );
  it('AvatarForm render elements', () => {
    const { getByRole } = render(node);
    expect(
      getByRole('button', { name: 'upload an avatar' }),
    ).toBeInTheDocument();
    expect(getByRole('button', { name: 'open pallete' })).toBeInTheDocument();
    expect(
      getByRole('button', { name: 'delete an avatar' }),
    ).toBeInTheDocument();
    expect(getByRole('img')).toBeInTheDocument();
  });
});
