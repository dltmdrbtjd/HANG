import React from 'react';
// style
import LabelStyle from './style';

export interface Props {
  id?: string;
  children?: any;
  fw?: string;
  fs?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  margin?: string;
  width?: string;
  height?: string;
  paddig?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  z?: string;
  addstyle?: any;
}

const Label: React.FC<Props> = ({
  id,
  children,
  ...props
}): React.ReactElement => {
  return (
    <LabelStyle htmlFor={id} {...props}>
      {children}
    </LabelStyle>
  );
};

export default Label;
