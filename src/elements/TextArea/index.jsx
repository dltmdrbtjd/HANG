import React from 'react';
import TextAreaStyle from './style';

const TextArea = ({ _onChange, value, placeholder, rows, label, ...props }) => {
  return (
    <>
      {label && <p style={{ margin: '0 0 12px 0', fontSize: 'md' }}>{label}</p>}
      <TextAreaStyle
        onChange={_onChange}
        value={value}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
    </>
  );
};

TextArea.defaultProps = {
  width: '100%',
  bgColor: 'white',
  color: 'black',
  fs: 'md',
  padding: '12px',
  radius: '14px',
  rows: '20',
  label: false,
  placeholder: '',
  _onChange: () => {},
};

export default TextArea;
