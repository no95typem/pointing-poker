import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import InputNumber from './InputNumber';

describe('Input number', () => {
  const data = {
    units: 'units',
    value: 1,
  };
  const { getByLabelText, queryByLabelText, getByRole } = render(
    <InputNumber {...data} />,
  );
  const { units, value } = data;
  it('Input number render elements and events', () => {
    const inputField = queryByLabelText(units);
    expect(inputField).toHaveValue(`${value}`);
    expect(getByRole('spinbutton')).toHaveStyle('font-size: 36px');
    expect(inputField).toBeTruthy();
    expect(inputField).not.toHaveFocus();
    userEvent.click(getByLabelText(units));
    expect(inputField).toHaveFocus();
  });
});
