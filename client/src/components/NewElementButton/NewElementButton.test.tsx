import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import NewElementButton from './NewElementButton';

describe('NewElementButton', () => {
  it('NewIssueButton render elements and events', () => {
    const data = {
      openModal: () => {},
      description: 'description',
    };
    const { getByRole, getByText } = render(<NewElementButton {...data} />);
    const button = getByRole('button');
    expect(button).toBeTruthy();
    expect(button).toBeEnabled();
    expect(getByText(data.description)).toBeTruthy();
    expect(button).not.toHaveFocus();
    userEvent.click(button);
    expect(button).toHaveFocus();
  });
});
