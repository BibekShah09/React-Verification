import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './View';
import { SuccessRoute } from '../../routes';
import history from '../../utils/browserHistory';
import withAlertBox from '../../utils/withAlertBox';
import { checkIfNumeric } from '../../utils/number';

const propTypes = {
  serverResponseWaiting: PropTypes.bool,
  verifyToken: PropTypes.func,
  displayAlertBox: PropTypes.func,
};

const defaultProps = {
  serverResponseWaiting: false,
  verifyToken: () => null,
  displayAlertBox: () => null,
};

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      serverValidationResponse: {
        isValid: true,
        message: 'Verification Error!',
      },
      formSubmitted: false,
    };

    this.codeSize = 6;
    this.codeType = 'text';
  }

  validateInputData = (data) => checkIfNumeric(data) && data.length === this.codeSize

  handleInputChange = (code) => {
    this.setState({ code });
  }

  handleValidationServerResponse = (response) => {
    const { serverValidationResponse } = this.state;
    serverValidationResponse.isValid = response.data.isValid;
    serverValidationResponse.message = response.data.message;

    this.setState({ serverValidationResponse });
    if (serverValidationResponse.isValid) {
      history.push(SuccessRoute);
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { verifyToken, displayAlertBox } = this.props;
    const { code } = this.state;
    const isInputValid = this.validateInputData(code);
    this.setState({ formSubmitted: true });

    if (isInputValid) {
      verifyToken({ code })
        .then((response) => {
          this.handleValidationServerResponse(response);
        })
        .catch((err) => {
          // Use Error handling: Sentry.io
          displayAlertBox(err);
        });
    }
  }

  // validate each single digit in Code Input
  validateSingleInput = (input) => {
    const { formSubmitted } = this.state;

    return !formSubmitted || checkIfNumeric(input);
  }

  render() {
    const { serverResponseWaiting } = this.props;
    const { serverValidationResponse } = this.state;

    return (
      <View
        loading={serverResponseWaiting}
        codeSize={this.codeSize}
        codeType={this.codeType}
        inputValidator={this.validateSingleInput}
        onInputChange={this.handleInputChange}
        serverValidationResponse={serverValidationResponse}
        onFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

Verification.propTypes = propTypes;

Verification.defaultProps = defaultProps;

export default withAlertBox(Verification);
