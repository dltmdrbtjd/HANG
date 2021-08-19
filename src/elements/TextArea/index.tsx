import React from 'react';
import TextAreaStyle from './style';

export interface Props {
  _onChange?: any;
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
  value,
  ...props
}): React.ReactElement => {
  return (
    <TextAreaStyle
      {...props}
      onChange={_onChange}
      value={value}
      placeholder={placeholder}
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
  rows: 20,
  border: '1px solid #E7E7E7',
  _onChange: () => {},
};

export default TextArea;
