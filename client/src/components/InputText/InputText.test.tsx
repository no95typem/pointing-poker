import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import InputText from './InputText';

describe('Input text', () => {
  const data = {
    name: 'name',
    label: 'label',
    value: 'value',
    onChange: () => {},
  };
  const { getByLabelText, queryByLabelText, getByRole } = render(
    <InputText data={data} />,
  );
  const { label } = data;
  it('Input text render elements and events', () => {
    expect(getByRole('textbox', { name: label })).toHaveStyle(
      'max-width: 150px',
    );
    expect(queryByLabelText(label)).toBeTruthy();
    expect(queryByLabelText(label)).not.toHaveFocus();
    userEvent.click(getByLabelText(label));
    expect(queryByLabelText(label)).toHaveFocus();
  });
});
