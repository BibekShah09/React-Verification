import React from 'react';
import PropTypes from 'prop-types';
import LoadingStyled from './LoadingStyled';

const propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

const defaultProps = {
  children: null,
  title: '',
};

const Loading = ({
  children, title, ...otherProps
}) => (
  <>
    <LoadingStyled title={title} {...otherProps} className="loading-main">
      <div className="loading-wrap">
        <div className="spinner-wrap">
          <div className="spinner" />
        </div>
        <p>{title}</p>
      </div>
    </LoadingStyled>
  </>
);

Loading.propTypes = propTypes;

Loading.defaultProps = defaultProps;

export default Loading;
