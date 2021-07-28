import React from 'react';
import StrongStyle from './style';

const Strong = ({ children, ...props }) => {
  return <StrongStyle {...props}>{children}</StrongStyle>;
};

Strong.defaultProps = {
  fw: 'semiBold',
  fs: 'md',
};

export default Strong;
