import React from 'react';
import TextStyle from './style';

const Text = ({ children, ...props }) => {
  return <TextStyle {...props}>{children}</TextStyle>;
};

export default Text;
