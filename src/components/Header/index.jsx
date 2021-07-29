import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderStyle from './style';
// components
import { Container, Logo } from '../../elements/index';

const Header = () => {
  const path = useLocation().pathname;

  if (path.includes('/signup') || path.includes('/login')) return null;

  return (
    <HeaderStyle>
      <Container height="66px">
        <Logo width="36px" height="36px" href="/" />
      </Container>
    </HeaderStyle>
  );
};

export default Header;
