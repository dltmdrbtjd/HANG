import React from 'react';
import { useLocation } from 'react-router-dom';
import ContainerStyle from './style';

const Container = ({ children, ...props }) => {
  const path = useLocation().pathname;

  return (
    <ContainerStyle
      {...props}
      noPadding={[
        '/signup',
        '/signup/welcome',
        '/login',
        '/onboarding',
      ].includes(path)}
    >
      {children}
    </ContainerStyle>
  );
};

Container.defaultProps = {
  padding: '90px 0 80px 0',
};

export default Container;
