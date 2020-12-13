import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeVisible } from '@testing-library/jest-dom/matchers';
import Verification from '../pages/verification';

const CODE_INPUT_DIGIT = 6;

expect.extend({ toBeVisible });

describe('when verification page is loaded', () => {
  it('should display 6 inputs and submit button in initial load', () => {
    const { getByText, getByLabelText } = render(<Verification />);

    for(let count = 0; count < CODE_INPUT_DIGIT; count += 1) {
      expect(getByLabelText(`blys-code-input-verification-${count}`)).toBeInTheDocument();
    }

    expect(getByText('SUBMIT').closest('button')).toBeInTheDocument();
  });

  it('should not render error message in initial load', () => {
    const { container } = render(<Verification />);
    expect(container).not.toHaveClass('error-message');
  });
});

describe('when user interacts on verification page', () => {
  it('should display loading indicator and button disabled when button clicked', async () => {
    const {
      getByLabelText,
      getByText,
      queryByText,
    } = render(<Verification />);

    for(let count = 0; count < CODE_INPUT_DIGIT; count ++) {
      fireEvent.change(getByLabelText(`blys-code-input-verification-${count}`), {
        target: { value: count },
      });
    }

    const Button = getByText('SUBMIT').closest('button');
    await fireEvent.click(Button);

    const LoadingIndicator = queryByText('Loading data... Please wait!');
    expect(LoadingIndicator).toBeInTheDocument();

    expect(Button).toBeDisabled();
  });

  it('should not display loading indicator when button clicked', async () => {
    const {
      getByLabelText,
      getByText,
      queryByText
    } = render(<Verification />);

    for(let count = 0; count < CODE_INPUT_DIGIT; count ++) {
      fireEvent.change(getByLabelText(`blys-code-input-verification-${count}`), {
        target: { value: count === CODE_INPUT_DIGIT-1 ? 'r' : count },
      });
    }

    const Button = getByText('SUBMIT').closest('button');
    await fireEvent.click(Button);

    const LoadingIndicator = queryByText('Loading data... Please wait!');
    expect(LoadingIndicator).not.toBeInTheDocument();
  });
});

