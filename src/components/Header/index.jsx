import React from 'react';
import HeaderStyle from './style';
// components
import { Container, Logo } from '../../elements/index';

const Header = () => {
  return (
    <HeaderStyle>
      <Container height="66px">
        <Logo width="36px" height="36px" href="/" />
      </Container>
    </HeaderStyle>
  );
};

export default Header;
