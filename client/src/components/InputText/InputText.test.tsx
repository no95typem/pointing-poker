import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import InputText from './InputText';

it('Input text', () => {
  const data = {
    name: 'name',
    label: 'label',
    value: 'value',
    onChange: () => {},
  };
  const { getByLabelText, queryByLabelText, getByRole } = render(
    <InputText data={data} />,
  );
  expect(getByRole('textbox', { name: 'label' })).toHaveStyle(
    'max-width: 150px',
  );
  expect(queryByLabelText(/label/i)).toBeTruthy();
  expect(queryByLabelText(/label/i)).not.toHaveFocus();
  userEvent.click(getByLabelText(/label/i));
  expect(queryByLabelText(/label/i)).toHaveFocus();
});
