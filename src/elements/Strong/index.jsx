import React from 'react';
import StrongStyle from './style';

const Strong = ({ children, ...props }) => {
  return <StrongStyle {...props}>{children}</StrongStyle>;
};

Strong.defaultProps = {
  fw: 500,
};

export default Strong;
