import React from 'react';
import { render } from '@testing-library/react';
import Success from '../pages/success/Success';

describe('Success View', () => {
  it('should display wel come text without errors', () => {
    const { getByText } = render(<Success />);
    const SuccessText = getByText('Wel Come');
    expect(SuccessText).toBeInTheDocument();
  });
});
