import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeInputStyled from './CodeInputStyled';
import { defaultInputStyle, defaultInputStyleInvalid } from './config';

const E_KEY = 69;
const BACKSPACE_KEY = 8;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

const propTypes = {
  /**
   * Unique Name of the component
   */
  name: PropTypes.string.isRequired,
  /**
   *@default text
   * Type of input
   */
  type: PropTypes.string,
  /**
   * @default true
   * First input focus on load
   */
  autoFocus: PropTypes.bool,
  /**
   * @default 6
   * Length of Input
   */
  inputSize: PropTypes.number,
  /**
   * @default ''
   * Initial Code Value
   */
  value: PropTypes.string,
  /**
   * @default null
   * callBack to execute onChange
   */
  onChange: PropTypes.func,
  /**
   * @default function returning true
   * function to execute validation for each input
   */
  inputValidator: PropTypes.func,
  /**
   * @default: imported from config
   * Default styling for input
   */
  inputStyle: PropTypes.shape(),
  /**
   * @default imported from config
   * Default styling when input invalid
   */
  inputStyleInvalid: PropTypes.shape(),
};

const defaultProps = {
  type: 'text',
  autoFocus: true,
  inputSize: 6,
  value: '',
  onChange: () => null,
  inputValidator: () => true,
  inputStyle: defaultInputStyle,
  inputStyleInvalid: defaultInputStyleInvalid,
};

class CodeInput extends Component {
  constructor(props) {
    const { inputSize, value } = props;
    const inputList = [...Array(inputSize)].map(() => '');

    super(props);
    this.state = {
      inputList,
      value: value || '',
    };

    this.textInputRef = [];
  }

  setInputListAndComputeValue = (inputList) => {
    const { onChange, type } = this.props;
    const value = inputList.reduce((accumulator, currentValue) => accumulator + currentValue);
    const typeCastedValue = type === 'number' ? Number(value) : value;

    this.setState({ inputList, value: typeCastedValue }, () => {
      const { value: updatedValue } = this.state;
      onChange(updatedValue);
    });
  }

  focusOnInputTarget = (targetIndex) => {
    const inputTarget = this.textInputRef[targetIndex];
    if (inputTarget) {
      inputTarget.focus();
      inputTarget.select();
    }
  }

  blurOnInputTarget = (targetIndex) => {
    const inputTarget = this.textInputRef[targetIndex];
    if (inputTarget) {
      inputTarget.blur();
    }
  }

  handleChange = (e) => {
    const { inputList } = this.state;
    const { inputSize } = this.props;
    const inputIndex = Number(e.target.dataset.id);
    const isLastTarget = inputSize === inputIndex + 1;
    const stringInput = String(e.target.value);
    // extract latest input
    inputList[inputIndex] = stringInput.replace(inputList[inputIndex], '');
    this.setInputListAndComputeValue(inputList);

    if (isLastTarget) {
      this.blurOnInputTarget(inputIndex);
    } else {
      this.focusOnInputTarget(inputIndex + 1);
    }
  }

  handleKeyDown = (e) => {
    const inputIndex = Number(e.target.dataset.id);
    const { inputSize } = this.props;
    const nextTargetIndex = (inputIndex + 1) < inputSize ? (inputIndex + 1) : null;
    const prevTargetIndex = (inputIndex) > 0 ? (inputIndex - 1) : null;
    const { inputList } = this.state;

    switch (e.keyCode) {
      case BACKSPACE_KEY:
        e.preventDefault();
        // if input is empty, shift to previous target.
        if (!inputList[inputIndex] && prevTargetIndex !== null) {
          this.focusOnInputTarget(prevTargetIndex);
        }

        if (inputList[inputIndex]) {
          inputList[inputIndex] = '';
        }

        this.setInputListAndComputeValue(inputList);
        break;

      case LEFT_ARROW_KEY:
        e.preventDefault();
        if (prevTargetIndex !== null) {
          this.focusOnInputTarget(prevTargetIndex);
        }
        break;

      case RIGHT_ARROW_KEY:
        e.preventDefault();
        if (nextTargetIndex) {
          this.focusOnInputTarget(nextTargetIndex);
        }
        break;

      case UP_ARROW_KEY:
        e.preventDefault();
        break;

      case DOWN_ARROW_KEY:
        e.preventDefault();
        break;

      case E_KEY:
        if (e.target.type === 'number') {
          e.preventDefault();
          break;
        }
        break;

      default:
        break;
    }
  }

  handlePasteEvent = (e) => {
    e.preventDefault();
    const { inputList } = this.state;
    const inputIndex = Number(e.target.dataset.id);
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    const pastedDataArray = pastedData.split('');

    // merge existing data and pasted data.
    const updatedList = inputList.map((input, loopIndex) => {
      if (loopIndex >= inputIndex && loopIndex < (inputIndex + pastedDataArray.length)) {
        return pastedDataArray[loopIndex - inputIndex];
      }

      return input;
    });

    this.setInputListAndComputeValue(updatedList);
  }

  getInputStyle = (valid) => {
    const { inputStyle, inputStyleInvalid } = this.props;

    return valid ? inputStyle : inputStyleInvalid;
  }

  checkIfValid = (input) => {
    const { inputValidator } = this.props;

    return inputValidator(input);
  }

  render() {
    const { inputList } = this.state;
    const { autoFocus, type, name } = this.props;

    return (
      <CodeInputStyled>
        {inputList.map((value, index) => (
          <input
            ref={(ref) => {
              this.textInputRef[index] = ref;
            }}
            id={`blys-code-input-${name}-${index}`}
            data-id={index}
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus={autoFocus && (index === 0) ? 'autoFocus' : ''}
            value={value}
            /* eslint-disable-next-line react/no-array-index-key */
            key={`blys-code-input-key-${name}-${index}`}
            type={type}
            style={this.getInputStyle(this.checkIfValid(value))}
            onFocus={(e) => e.target.select(e)}
            onChange={(e) => this.handleChange(e)}
            onPaste={(e) => this.handlePasteEvent(e)}
            onKeyDown={(e) => this.handleKeyDown(e)}
            aria-label={`blys-code-input-${name}-${index}`}
            data-valid={false}
            disabled={false}
          />
        ))}
      </CodeInputStyled>
    );
  }
}

CodeInput.propTypes = propTypes;

CodeInput.defaultProps = defaultProps;

export default CodeInput;
