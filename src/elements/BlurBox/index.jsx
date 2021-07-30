import React from 'react';
// style
import BlurBoxStyle from './style';

const BlurBox = ({ children, ...props }) => {
  return <BlurBoxStyle {...props}>{children}</BlurBoxStyle>;
};

export default BlurBox;
