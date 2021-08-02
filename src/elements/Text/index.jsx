import React from 'react';
import TextStyle from './style';

const Text = ({ children, ...props }) => {
  return <TextStyle {...props}>{children}</TextStyle>;
};

Text.defaultProps = {
  width: '100%',
  color: 'black',
  overflow: 'hidden',
  wb: 'break-all',
  ws: 'pre-line',
};

export default Text;
