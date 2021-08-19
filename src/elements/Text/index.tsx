import React from 'react';
import TextStyle from './style';

export interface Props {
  children?: any;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  fs?: string;
  fw?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  ls?: string;
  wb?: string;
  ws?: string;
  addstyle?: any;
  overflow?: string;
}

const Text: React.FC<Props> = ({ children, ...props }): React.ReactElement => {
  return <TextStyle {...props}>{children}</TextStyle>;
};

export default Text;
