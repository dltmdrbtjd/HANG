import React from 'react';
import TextAreaStyle from './style';

const TextArea = ({ _onChange, value, placeholder, ...props }) => {
  return (
    <TextAreaStyle
      onChange={_onChange}
      value={value}
      placeholder={placeholder}
      {...props}
    />
  );
};

TextArea.defaultProps = {
  width: '100%',
  height: '100px',
  bgColor: 'white',
  color: 'black',
  fs: 'md',
  padding: '12px',
  radius: '14px',
  rows: '20',
  border: '1px solid #E7E7E7',
  _onChange: () => {},
};

export default TextArea;
