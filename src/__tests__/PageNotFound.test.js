import React from 'react';
import { render } from '@testing-library/react';
import PageNotFound from '../pages/pageNotFound/PageNotFound';

describe('Page Not Found View', () => {
  it('should render page not found without errors', () => {
    const { getByText } = render(<PageNotFound />);
    const pageNotFoundText = getByText('Page Not Found');
    expect(pageNotFoundText).toBeInTheDocument();
  });
});
