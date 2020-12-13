const defaultInputStyle = {
  MozAppearance: 'textfield',
  borderRadius: '6px',
  borderTop: '2px solid gray',
  borderRight: '1px solid',
  borderBottom: '1px solid',
  borderLeft: '2px solid gray',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,.10)',
  margin: '4px',
  paddingLeft: '8px',
  paddingRight: 0,
  width: '38px',
  height: '38px',
  fontSize: '32px',
  boxSizing: 'border-box',
};

const defaultInputStyleInvalid = {
  ...defaultInputStyle,
  color: '#F43911',
  backgroundColor: '#F8E0DF',
  border: '1px solid #F61A0C',
};

export { defaultInputStyle, defaultInputStyleInvalid };

export default defaultInputStyle;
