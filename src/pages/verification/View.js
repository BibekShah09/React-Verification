import React from 'react';
import PropTypes from 'prop-types';
import withLoading from '../../utils/withLoading';
import { Button, CodeInput } from '../../components';
import VerificationStyled from './VerificationStyled';

const propTypes = {
  loading: PropTypes.bool,
  codeType: PropTypes.string,
  inputValidator: PropTypes.func,
  onInputChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  serverValidationResponse: PropTypes.shape({
    isValid: PropTypes.bool,
    message: PropTypes.string,
  }),
  codeSize: PropTypes.number.isRequired,
};

const defaultProps = {
  loading: false,
  codeType: 'text',
  serverValidationResponse: {
    isValid: true,
    message: '',
  },
  inputValidator: () => true,
  onInputChange: () => null,
  onFormSubmit: () => null,
};

const VerificationView = ({ ...props }) => {
  const {
    codeSize,
    codeType,
    inputValidator,
    onInputChange,
    onFormSubmit,
    serverValidationResponse,
    loading,
  } = props;

  return (
    <VerificationStyled>
      <div className="center">
        {
          !serverValidationResponse.isValid
            ? (<div className="error-message">{serverValidationResponse.message}</div>) : null
        }
        <form
          action="#"
          onSubmit={(event) => onFormSubmit(event)}
        >
          <CodeInput
            name="verification"
            type={codeType}
            inputSize={codeSize}
            onChange={onInputChange}
            inputValidator={inputValidator}
          />
          <Button type="submit" title="SUBMIT" disabled={loading} />
        </form>
      </div>
    </VerificationStyled>
  );
};

VerificationView.propTypes = propTypes;

VerificationView.defaultProps = defaultProps;

const VerificationViewWithLoadingIndicator = withLoading(VerificationView);

export default VerificationViewWithLoadingIndicator;
