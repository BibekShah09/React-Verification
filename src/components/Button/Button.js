import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';

const propTypes = {
  /**
   * @default submit
   * html button type
   */
  type: PropTypes.string,
  /**
   * @default ''
   * title to be passed along with the string
   */
  title: PropTypes.string,
  /**
   * @default false'
   * weather button is disabled or not
   */
  disabled: PropTypes.bool,
};

const defaultProps = {
  type: 'submit',
  title: null,
  disabled: false,
};

const Button = ({ type, title, disabled }) => (
  <ButtonStyled>
    {/* eslint-disable-next-line react/button-has-type */}
    <button type={type} className="button" disabled={disabled}>
      {title}
    </button>
  </ButtonStyled>
);

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
