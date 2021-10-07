import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import ConnectPopup from './ConnectPopup';

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

describe('ConnectPopup', () => {
  const data = {
    isOpen: true,
    onClose: () => {},
    forDealer: true,
  };
  const node = (
    <Provider store={store}>
      <BrowserRouter basename={BASENAME}>
        <ConnectPopup {...data} />
      </BrowserRouter>
    </Provider>
  );
  it('ConnectPopup render elements', () => {
    render(node);
    expect(
      screen.getByText(/Setting up your new participating/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: 'Your first name:',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: 'Your last name:',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: 'Your job position:',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeTruthy();
  });
});
