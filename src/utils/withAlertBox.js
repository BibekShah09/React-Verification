import styled from 'styled-components';
import React, { Component } from 'react';
import { getDisplayName } from './component';

export default function withAlertBox(SourceComponent) {
  class AlertBox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        message: '',
      };
    }

    displayAlertBox = (message) => {
      this.setState({ message, show: true }, () => this.attachTimeOut());
    }

    attachTimeOut = () => {
      setTimeout(() => {
        this.resetAlertBox();
      }, 1000);
    }

    resetAlertBox = () => {
      this.setState({ message: '', show: false });
    };

    render() {
      const { show, message } = this.state;
      const { ...oldProps } = this.props;
      const newProps = { displayAlertBox: this.displayAlertBox };

      return (
        <>
          <SourceComponent
            {...oldProps}
            {...newProps}
          />
          <>
            {show && (
              <AlertStyled>
                <span className="error-message">{message}</span>
              </AlertStyled>
            )}
          </>
        </>
      );
    }
  }

  AlertBox.displayName = `withAlert(${getDisplayName(SourceComponent)})`;

  return AlertBox;
}

const AlertStyled = styled.div`
  position: fixed;
  bottom: 32px;
  z-index: 1200;
  
  .error-message {
    padding: 24px;
    margin: 2px;
    border: 1px solid blue;
    color: red;
  }
`;
