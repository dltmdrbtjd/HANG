import React from 'react';
import ContainerStyle from './style';

const Container = ({ children, ...props }) => {
  return <ContainerStyle {...props}>{children}</ContainerStyle>;
};

export default Container;
