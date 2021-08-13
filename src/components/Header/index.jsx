import React, { useEffect, useState } from 'react';
// icon
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// router
import { useLocation } from 'react-router-dom';
import { HeaderIncluded } from '../../route/Path';
// history
import { history } from '../../redux/configureStore';
// components
import { Container, Logo, Grid, Button } from '../../elements';
import NotiBadge from './NotiBadge';
// style
import HeaderStyle from './style';
// images
import LogoImg from '../../Images/Symbol.png';

const Header = () => {
  const path = useLocation().pathname;
  const isHome = path === '/';
  const [title, setTitle] = useState('');
  useEffect(() => {
    switch (true) {
      case /search/.test(path):
        setTitle('검색');
        break;

      case /detail/.test(path):
        setTitle('프로필');
        break;

      case /mypage/.test(path):
        setTitle('마이페이지');
        break;

      case /chat/.test(path):
        setTitle('채팅');
        break;

      case /noti/.test(path):
        setTitle('알림');
        break;

      case /favorite/.test(path):
        setTitle('관심목록');
        break;

      default:
        setTitle('Hang');
    }
  }, [path]);

  return HeaderIncluded.includes(path) || /mypage\/promise/.test(path) ? (
    <HeaderStyle>
      <Container height="66px" padding="0">
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
            imgUrl={isHome ? LogoImg : null}
            height={isHome ? '36px' : null}
            width={isHome ? '36px' : null}
          >
            {title}
          </Logo>

          <NotiBadge />
        </Grid>
      </Container>
    </HeaderStyle>
  ) : null;
};

export default Header;
