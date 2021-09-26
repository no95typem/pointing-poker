import React from 'react';
import { render, screen } from '@testing-library/react';
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

describe.skip('Start Page', () => {
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
    render(node);
    expect(screen.getByText(/2021/i)).toBeVisible();
    expect(screen.getByText(/Pointing Poker/i)).toContainElement(
      screen.getByText(/by no95typem, kaesid, vimbi/i),
    );
    expect(screen.getByText(/Start your planning:/i)).toHaveStyle(
      'fontFamily: handwrite',
    );
    expect(screen.getByText(/Connect/i)).toBeEnabled();
    expect(screen.getByText(/Connect/i)).toHaveAttribute('type', 'button');
  });
  it('input focus', () => {
    render(node);
    expect(screen.getByPlaceholderText(/Session ID/i)).not.toHaveFocus();
    screen.getByPlaceholderText(/Session ID/i).focus();
    expect(screen.getByPlaceholderText(/Session ID/i)).toHaveFocus();
  });
  it('events', () => {
    render(node);
    expect(screen.queryByDisplayValue(/Test search value/i)).toBeNull();
    userEvent.type(
      screen.getByPlaceholderText(/Session ID/i),
      'Test search value',
    );
    expect(
      screen.queryByDisplayValue(/Test search value/i),
    ).toBeInTheDocument();
  });
  it('field required', () => {
    render(node);
    userEvent.click(screen.getByText(/Connect/i));
    expect(
      screen.getByRole('textbox', { name: 'Your first name:' }),
    ).toBeRequired();
    userEvent.type(
      screen.getByRole('textbox', { name: 'Your first name:' }),
      'Patrick',
    );
    expect(
      screen.getByRole('textbox', { name: 'Your first name:' }),
    ).toHaveDisplayValue(/Patrick/i);
  });
});
