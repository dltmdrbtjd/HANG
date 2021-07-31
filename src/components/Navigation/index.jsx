import React, { useState } from 'react';
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

  return (
    <NavigationStyle>
      <Navigationicons
        className={on === 1 ? 'Click' : ''}
        onClick={() => {
          history.push('/search');
          setOn(1);
        }}
      >
        <SearchIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">검색</Text>
      </Navigationicons>
      <Navigationicons
        className={on === 2 ? 'Click' : ''}
        onClick={() => {
          history.push('/favorite');
          setOn(2);
        }}
      >
        <FavoriteBorderIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">관심목록</Text>
      </Navigationicons>
      <Navigationicons
        className={on === 3 ? 'Click' : ''}
        onClick={() => {
          history.push('/');
          setOn(3);
        }}
      >
        <HomeOutlinedIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">홈</Text>
      </Navigationicons>
      <Navigationicons
        className={on === 4 ? 'Click' : ''}
        onClick={() => {
          history.push('/chat');
          setOn(4);
        }}
      >
        <SmsOutlinedIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">채팅</Text>
      </Navigationicons>
      <Navigationicons
        className={on === 5 ? 'Click' : ''}
        onClick={() => {
          history.push('/mypage');
          setOn(5);
        }}
      >
        <PermIdentityIcon style={{ fontSize: 35 }} />
        <Text margin="6px 0 0 0">마이페이지</Text>
      </Navigationicons>
    </NavigationStyle>
  );
};

export default Navigation;
