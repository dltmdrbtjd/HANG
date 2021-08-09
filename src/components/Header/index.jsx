import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderStyle from './style';
// components
import { Container, Logo, Grid } from '../../elements';
import NotiBadge from './NotiBadge';

const Header = () => {
  const path = useLocation().pathname;

  if (['/signup', '/login', '/onboarding', '/chat/room'].includes(path))
    return null;

  return (
    <HeaderStyle>
      <Container height="66px">
        <Grid height="100%" display="flex" hoz="flex-end" ver="center">
          <Logo width="36px" height="36px" href="/" />
          <NotiBadge />
        </Grid>
      </Container>
    </HeaderStyle>
  );
};

export default Header;
