import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import NewIssueButton from './NewIssueButton';

describe('NewIssueButton', () => {
  it('NewIssueButton render elements and events', () => {
    const data = {
      editIssue: () => {},
    };
    const { getByLabelText, getByRole, getByText } = render(
      <NewIssueButton {...data} />,
    );
    const button = getByRole('button');
    expect(button).toBeTruthy();
    expect(button).toBeEnabled();
    expect(getByText(/Create new issue/i)).toBeTruthy();
    expect(getByLabelText('edit')).toHaveStyle('background: transparent');
    expect(button).not.toHaveFocus();
    userEvent.click(button);
    expect(button).toHaveFocus();
  });
});
