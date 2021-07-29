import React from 'react';
import { useLocation } from 'react-router-dom';
import ContainerStyle from './style';

const Container = ({ children, ...props }) => {
  const path = useLocation().pathname;

  return (
    <ContainerStyle
      {...props}
      isPadding={path.includes('/signup') || path.includes('/login')}
    >
      {children}
    </ContainerStyle>
  );
};

export default Container;
