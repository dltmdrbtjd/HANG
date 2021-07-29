import React from 'react';
import InputStyle from './style';

const Input = ({
  id,
  type,
  name,
  value,
  placeholder,
  _onChange,
  _onKeyPress,
  ...props
}) => {
  return (
    <InputStyle
      id={id}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={_onChange}
      onKeyPress={_onKeyPress}
      name={name}
      {...props}
    />
  );
};

Input.defaultProps = {
  _onChange: () => {},
  _onKeyPress: () => {},
  type: 'text',
  placeholder: '',
  width: '100%',
  height: '48px',
  bgColor: 'white',
  color: 'black',
  fs: 'md',
  padding: '0 12px',
  radius: '14px',
  shadow: 'inset 0px 2px 3px rgba(136, 136, 136, 0.25)',
};

export default Input;
