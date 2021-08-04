import React from 'react';
// router
import { useLocation } from 'react-router';
// style
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Text } from '../../elements';
import { Navigationicons, NavigationStyle } from './style';
// history
import { history } from '../../redux/configureStore';

const Navigation = () => {
  const path = useLocation().pathname;

  if (
    path.includes('/signup') ||
    path.includes('/login') ||
    path.includes('/onboarding')
  )
    return null;

  return (
    <NavigationStyle>
      <Navigationicons
        className={path.includes('/search') ? 'Click' : ''}
        onClick={() => {
          history.push('/search');
        }}
      >
        <SearchIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">검색</Text>
      </Navigationicons>
      <Navigationicons
        className={path.includes('/favorite') ? 'Click' : ''}
        onClick={() => {
          history.push('/favorite');
        }}
      >
        <FavoriteBorderIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">관심목록</Text>
      </Navigationicons>
      <Navigationicons
        className={path === '/' ? 'Click' : ''}
        onClick={() => {
          history.push('/');
        }}
      >
        <HomeOutlinedIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">홈</Text>
      </Navigationicons>
      <Navigationicons
        className={path.includes('/chat') ? 'Click' : ''}
        onClick={() => {
          history.push('/chat');
        }}
      >
        <SmsOutlinedIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">채팅</Text>
      </Navigationicons>
      <Navigationicons
        className={path.includes('/mypage') ? 'Click' : ''}
        onClick={() => {
          history.push('/mypage');
        }}
      >
        <PermIdentityIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">마이페이지</Text>
      </Navigationicons>
    </NavigationStyle>
  );
};

export default Navigation;
