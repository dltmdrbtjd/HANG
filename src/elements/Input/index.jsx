import React from 'react';
import InputStyle from './style';

const Input = ({
  label,
  type,
  value,
  placeholder,
  _onChange,
  _onKeyPress,
  ...props
}) => {
  return (
    <>
      {label && <p style={{ margin: '0 0 12px 0', fontSize: 'md' }}>{label}</p>}
      <InputStyle
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={_onChange}
        onKeyPress={_onKeyPress}
        {...props}
      />
    </>
  );
};

Input.defaultProps = {
  label: false,
  type: 'text',
  placeholder: '',
  width: '100%',
  height: '48px',
  bgColor: 'white',
  color: 'black',
  fs: 'md',
  padding: '0 12px',
  radius: '14px',
};

export default Input;
