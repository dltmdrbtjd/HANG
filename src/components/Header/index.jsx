import React from 'react';
// icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// router
import { useLocation } from 'react-router-dom';
import { HeaderIncluded } from '../../Route/Path';
// history
import { history } from '../../redux/configureStore';
// components
import { Container, Logo, Grid, Button } from '../../elements';
import NotiBadge from './NotiBadge';
// style
import HeaderStyle from './style';
// images
import LogoImg from '../../Images/Symbol.png';

const Header = ({ children }) => {
  const path = useLocation().pathname;

  if (!HeaderIncluded.includes(path)) return null;

  return (
    <HeaderStyle>
      <Container height="66px">
        <Grid
          height="100%"
          isFlex
          hoz={path !== '/' ? 'space-between' : 'flex-end'}
          ver="center"
        >
          {path !== '/' ? (
            <Button
              form="text"
              margin="0 18px 0 0"
              _onClick={() => {
                history.goBack();
              }}
            >
              <ArrowBackIosIcon />
            </Button>
          ) : null}

          <Logo
            imgUrl={path === '/' && LogoImg}
            width={path === '/' && '36px'}
            height={path === '/' && '36px'}
          >
            {children}
          </Logo>

          <NotiBadge />
        </Grid>
      </Container>
    </HeaderStyle>
  );
};

export default Header;
