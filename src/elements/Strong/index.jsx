import React from 'react';
import StrongStyle from './style';

const Strong = ({ children }) => {
  return <StrongStyle>{children}</StrongStyle>;
};

Strong.defaultProps = {};

export default Strong;
