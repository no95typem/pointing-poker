import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Switcher from './Switcher';

describe('Switcher', () => {
  const data = {
    name: 'name',
    label: 'label',
    value: 'value',
    onChange: () => {},
  };
  const { label } = data;
  const { getByRole } = render(<Switcher data={data} />);
  it('Switcher render elements and events', () => {
    const checkbox = getByRole('checkbox', { name: label });
    expect(checkbox).toBeTruthy();
    expect(checkbox).toBeChecked();
    expect(checkbox).not.toHaveFocus();
    userEvent.click(checkbox);
    expect(checkbox).toHaveFocus();
  });
});
