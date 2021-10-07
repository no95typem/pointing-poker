import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import KickModal from './KickModal';

describe('KickModal', () => {
  const data = {
    isOpen: true,
    initName: 'initName',
    targetMame: 'targetMame',
    onClose: () => {},
    onConfirm: () => {},
  };
  const { targetMame, initName } = data;
  const { getByRole, queryByText, getByText } = render(<KickModal {...data} />);
  it('KickModal render elements and events', () => {
    expect(queryByText(/Kick Player?/i)).toBeNull();
    expect(
      getByText(
        `${initName} want to kick ${targetMame}. Do you agree with it?`,
      ),
    ).toBeInTheDocument();
    const buttonYes = getByRole('button', { name: 'Yes' });
    expect(buttonYes).toBeInTheDocument();
    expect(getByRole('button', { name: 'No' })).toBeInTheDocument();
    expect(buttonYes).not.toHaveFocus();
    userEvent.click(buttonYes);
    expect(buttonYes).toHaveFocus();
  });
});
