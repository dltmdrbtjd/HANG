import React, { useState, useEffect } from 'react';
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
  const [on, setOn] = useState(3);

  const path = useLocation().pathname;

  if (
    path.includes('/signup') ||
    path.includes('/login') ||
    path.includes('/onboarding')
  )
    return null;

  const PathChangeHandler = () => {
    if (path.includes('/search')) {
      setOn(1);
    } else if (path.includes('/favorite')) {
      setOn(2);
    } else if (path.includes('/')) {
      setOn(3);
    } else if (path.includes('/chat')) {
      setOn(4);
    } else if (path.includes('/mypage')) {
      setOn(5);
    }
  };

  useEffect(() => {
    PathChangeHandler();
  }, [path]);

  return (
    <NavigationStyle>
      <Navigationicons
        className={on === 1 ? 'Click' : ''}
        onClick={() => {
          history.push('/search');
        }}
      >
        <SearchIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">검색</Text>
      </Navigationicons>
      <Navigationicons
        className={on === 2 ? 'Click' : ''}
        onClick={() => {
          history.push('/favorite');
        }}
      >
        <FavoriteBorderIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">관심목록</Text>
      </Navigationicons>
      <Navigationicons
        className={on === 3 ? 'Click' : ''}
        onClick={() => {
          history.push('/');
        }}
      >
        <HomeOutlinedIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">홈</Text>
      </Navigationicons>
      <Navigationicons
        className={on === 4 ? 'Click' : ''}
        onClick={() => {
          history.push('/chat');
        }}
      >
        <SmsOutlinedIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">채팅</Text>
      </Navigationicons>
      <Navigationicons
        className={on === 5 ? 'Click' : ''}
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
