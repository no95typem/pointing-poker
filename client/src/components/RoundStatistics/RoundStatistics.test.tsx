import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RoundStatistics from './RoundStatistics';

describe('RoundStatistics', () => {
  it('RoundStatistics render elements', () => {
    const data = {
      issueTitle: 'issueTitle',
      votes: {},
    };
    const { issueTitle } = data;
    const { queryByText, getByText } = render(<RoundStatistics {...data} />);
    expect(getByText(issueTitle)).toBeInTheDocument();
    expect(queryByText(/Statistics:/i)).not.toBeInTheDocument();
    expect(getByText(issueTitle)).toHaveStyle('text-transform: uppercase');
  });
});
