import React from 'react';
import TextAreaStyle from './style';

export interface Props {
  _onChange?: any;
  _onKeyPress?: any;
  addstyle?: any;
  value?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  color?: string;
  fs?: string;
  padding?: string;
  radius?: string;
  rows?: number;
  border?: string;
}

const TextArea: React.FC<Props> = ({
  placeholder,
  _onChange,
  _onKeyPress,
  value,
  ...props
}): React.ReactElement => {
  return (
    <TextAreaStyle
      {...props}
      onChange={_onChange}
      onKeyPress={_onKeyPress}
      value={value}
      placeholder={placeholder}
    />
  );
};

TextArea.defaultProps = {
  width: '100%',
  bgColor: 'white',
  height: '100px',
  color: 'black',
  fs: 'md',
  padding: '12px',
  radius: '14px',
  border: '1px solid #E7E7E7',
  _onChange: () => {},
};

export default TextArea;
