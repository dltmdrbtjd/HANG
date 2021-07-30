import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderStyle from './style';
// components
import { Container, Logo, Grid } from '../../elements';
import Noti from './Noti';

const Header = () => {
  const path = useLocation().pathname;

  if (
    path.includes('/signup') ||
    path.includes('/login') ||
    path.includes('/onboarding')
  )
    return null;

  return (
    <HeaderStyle>
      <Container height="66px">
        <Grid height="100%" display="flex" hoz="flex-end" ver="center">
          <Logo width="36px" height="36px" href="/" />
          <Noti />
        </Grid>
      </Container>
    </HeaderStyle>
  );
};

export default Header;
