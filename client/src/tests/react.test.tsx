import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Header } from '../modules/Header/Header';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from '../modules/Routes/Routes';
import { Footer } from '../modules/Footer/Footer';

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

describe('Start Page', () => {
  const node = (
    <Provider store={store}>
      <BrowserRouter basename={BASENAME}>
        <Header />
        <Routes />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
  it('renders Start Page', () => {
    const { getByText } = render(node);
    expect(getByText(/2021/i)).toBeVisible();
    expect(getByText(/Pointing Poker/i)).toContainElement(
      getByText(/by no95typem, kaesid, vimbi/i),
    );
    expect(getByText(/Start your planning:/i)).toHaveStyle(
      'fontFamily: handwrite',
    );
    expect(getByText(/Connect/i)).toBeEnabled();
    expect(getByText(/Connect/i)).toHaveAttribute('type', 'button');
  });
  it('input focus', () => {
    const { getByPlaceholderText } = render(node);
    expect(getByPlaceholderText(/Session ID/i)).not.toHaveFocus();
    getByPlaceholderText(/Session ID/i).focus();
    expect(getByPlaceholderText(/Session ID/i)).toHaveFocus();
  });
  it('events', () => {
    const { getByPlaceholderText, queryByDisplayValue } = render(node);
    expect(queryByDisplayValue(/Test search value/i)).toBeNull();
    userEvent.type(getByPlaceholderText(/Session ID/i), 'Test search value');
    expect(queryByDisplayValue(/Test search value/i)).toBeInTheDocument();
  });
  it('field required', () => {
    const { getByText, getByRole } = render(node);
    userEvent.click(getByText(/Connect/i));
    expect(getByRole('textbox', { name: 'Your first name:' })).toBeRequired();
    userEvent.type(
      getByRole('textbox', { name: 'Your first name:' }),
      'Patrick',
    );
    expect(
      getByRole('textbox', { name: 'Your first name:' }),
    ).toHaveDisplayValue(/Patrick/i);
  });
});
