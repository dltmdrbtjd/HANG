import React from 'react';
import TextStyle from './style';

const Text = ({ children }) => {
  return <TextStyle>{children}</TextStyle>;
};

Text.defaultProps = {
  width: '100%',
  color: 'black',
  overflow: 'hidden',
  wb: 'break-all',
};

export default Text;
