import React from 'react';
import SpanStyle from './style';

const Span = ({ children, ...props }) => {
  return <SpanStyle {...props}>{children}</SpanStyle>;
};

Span.defaultProps = {};

export default Span;
