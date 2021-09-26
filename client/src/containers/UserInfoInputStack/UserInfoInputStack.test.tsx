import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import UserInfoInputStack from './UserInfoInputStack';

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

describe('UserInfoInputStack', () => {
  const data = {
    name: 'name',
    isNameInvalid: true,
    onChange: () => {},
  };
  const node = (
    <Provider store={store}>
      <BrowserRouter basename={BASENAME}>
        <UserInfoInputStack {...data} />
      </BrowserRouter>
    </Provider>
  );
  it('UserInfoInputStack events', () => {
    render(node);
    const firstNameField = screen.getByRole('textbox', {
      name: 'Your first name:',
    });
    const lastNameField = screen.getByRole('textbox', {
      name: 'Your last name:',
    });
    const jobPositionField = screen.getByRole('textbox', {
      name: 'Your job position:',
    });
    userEvent.click(firstNameField);
    expect(firstNameField).toHaveFocus();
    userEvent.tab();
    expect(lastNameField).toHaveFocus();
    userEvent.tab();
    expect(jobPositionField).toHaveFocus();
    expect(lastNameField).toHaveDisplayValue('');
    userEvent.type(lastNameField, 'Patrick');
    expect(lastNameField).toHaveDisplayValue(/Patrick/i);
  });
});
