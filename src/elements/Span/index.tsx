import React from 'react';
import SpanStyle from './style';

export interface Props {
  isFlex: string;
  hoz: string;
  ver: string;
  width: string;
  height: string;
  shadow: string;
  radius: string;
  bgColor: string;
  margin: string;
  padding: string;
  fs: string;
  fw: string;
  color: string;
  lh: string;
  textAlign: string;
  border: string;
  borDirection: string;
  position: string;
  top: string;
  right: string;
  bottom: string;
  left: string;
  z: string;
  addstyle?: any;
}

const Span: React.FC<Props> = ({ children, ...props }) => {
  return <SpanStyle {...props}>{children}</SpanStyle>;
};

export default Span;
