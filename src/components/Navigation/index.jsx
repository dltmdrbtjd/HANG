import React from 'react';
// material
import Badge from '@material-ui/core/Badge';
// redux
import { useSelector } from 'react-redux';
// router
import { useLocation } from 'react-router';
// serach
import search from '../../Images/NavigationIcons/search.svg';
import onsearch from '../../Images/NavigationIcons/onsearch.svg';
// favorite
import heart from '../../Images/NavigationIcons/heart.svg';
import onheart from '../../Images/NavigationIcons/onheart.svg';
// home
import home from '../../Images/NavigationIcons/home.svg';
import onhome from '../../Images/NavigationIcons/onhome.svg';
// chat
import chat from '../../Images/NavigationIcons/chat.svg';
import onchat from '../../Images/NavigationIcons/onchat.svg';
// mpyage
import mypage from '../../Images/NavigationIcons/mypage.svg';
import onmypage from '../../Images/NavigationIcons/onmypage.svg';
// style
import { Text, Grid } from '../../elements';
import { Navigationicons, NavigationStyle } from './style';
// history
import { history } from '../../redux/configureStore';
// path
import { HeaderIncluded } from '../../route/Path';
// style
import '../Header/NotiBadge/style.css';

const Navigation = () => {
  const path = useLocation().pathname;
  const chatAlarmChecked = useSelector(state => state.chat.alarmCount);

  return HeaderIncluded.includes(path) || /mypage\/promise/.test(path) ? (
    <Grid
      width="100%"
      bgColor="bgColor"
      position="fixed"
      bottom="0"
      height="80px"
      z="3"
      shadow="0px -2px 3px rgba(196, 196, 196, 0.25)"
    >
      <NavigationStyle>
        <Navigationicons
          className={path.includes('/search') ? 'Click' : ''}
          onClick={() => history.push('/search')}
        >
          <img
            alt="search"
            src={path.includes('/search') ? onsearch : search}
            style={{ width: '26.5px', height: '26.5px' }}
          />
          <Text margin="10px 0 0 0">검색</Text>
        </Navigationicons>
        <Navigationicons
          className={path.includes('/favorite') ? 'Click' : ''}
          onClick={() => history.push('/favorite')}
        >
          <img
            alt="favorite"
            src={path.includes('/favorite') ? onheart : heart}
            style={{ width: '29px', height: '26px' }}
          />
          <Text margin="10px 0 0 0">관심목록</Text>
        </Navigationicons>
        <Navigationicons
          className={path === '/' ? 'Click' : ''}
          onClick={() => history.push('/')}
        >
          <img alt="home" src={path === '/' ? onhome : home} />
          <Text margin="10px 0 0 0">홈</Text>
        </Navigationicons>
        <Navigationicons
          className={path.includes('/chat') ? 'Click' : ''}
          onClick={() => history.push('/chat')}
        >
          <Badge
            invisible={chatAlarmChecked}
            variant="dot"
            overlap="circular"
            color="secondary"
          >
            <img
              alt="chat"
              src={path.includes('/chat') ? onchat : chat}
              style={{ width: '27px', height: '26px', marginLeft: '4px' }}
            />
          </Badge>
          <Text margin="10px 0 0 4px">채팅</Text>
        </Navigationicons>
        <Navigationicons
          className={path.includes('/mypage') ? 'Click' : ''}
          onClick={() => history.push('/mypage')}
        >
          <img
            alt="mypage"
            src={path.includes('/mypage') ? onmypage : mypage}
            style={{ width: '25px', height: '26px' }}
          />
          <Text margin="10px 0 0 0">마이페이지</Text>
        </Navigationicons>
      </NavigationStyle>
    </Grid>
  ) : null;
};

export default Navigation;
