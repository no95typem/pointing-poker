import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditableHeader from './EditableHeader';

describe('EditableHeader', () => {
  const data = {
    name: { value: 'name', isSynced: true },
    changeValue: (name: string) => {},
    isPlayerDealer: true,
  };
  it('EditableHeader render elements and events', () => {
    const { getByRole, getByText, queryByText, getByLabelText } = render(
      <EditableHeader {...data} />,
    );
    const { value } = data.name;
    expect(getByText(value)).toBeInTheDocument();
    expect(getByLabelText(/edit/i)).toBeTruthy();
    expect(queryByText(/Topic:/i)).not.toBeInTheDocument();
    fireEvent.click(getByLabelText(/edit/i));
    expect(getByText(/Topic:/i)).toBeInTheDocument();
    expect(getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Change' })).toBeInTheDocument();
  });
});
