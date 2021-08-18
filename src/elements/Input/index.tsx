import React from 'react';
import InputStyle from './style';

export interface Props {
  width?: string;
  height?: string;
  bgColor?: string;
  padding?: string;
  radius?: string;
  border?: string;
  fs?: string;
  shadow?: string;
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  accept?: string;
  placeholder?: string;
  _onChange?: any;
  _onKeyPress?: any;
  addstyle?: any;
}

const Input: React.FC<Props> = ({
  id,
  type,
  name,
  value,
  accept,
  placeholder,
  _onChange,
  _onKeyPress,
  ...props
}): React.ReactElement => {
  return (
    <InputStyle
      id={id}
      value={value}
      placeholder={placeholder}
      type={type}
      accept={accept}
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
  padding: '0 12px',
  radius: '14px',
  border: '1px solid #E7E7E7',
};

export default Input;
