import React from 'react';
// icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// router
import { useLocation } from 'react-router-dom';
import { pathURI, withoutHeader } from '../../Route/Path';
// history
import { history } from '../../redux/configureStore';
// components
import { Container, Logo, Grid, Button } from '../../elements';
import NotiBadge from './NotiBadge';
// style
import HeaderStyle from './style';

const Header = () => {
  const path = useLocation().pathname;

  if (withoutHeader.includes(path) && !pathURI[path]) return null;

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

          <Logo width="36px" height="36px" href="/" />

          <NotiBadge />
        </Grid>
      </Container>
    </HeaderStyle>
  );
};

export default Header;
