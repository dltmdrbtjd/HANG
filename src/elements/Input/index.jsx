import React from 'react';
import InputStyle from './style';
import Text from '../Text/index';

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
      {label && (
        <Text margin="0 0 12px 0" fs="md">
          {label}
        </Text>
      )}
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
  _onChange: () => {},
  _onKeyPress: () => {},
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
