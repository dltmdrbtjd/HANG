import React from 'react';
// icon
import ControlPointIcon from '@material-ui/icons/ControlPoint';
// elements
import { Grid, MainTitle, Link, SubTitle } from '../../elements';
// components
import ProfileCard from '../../components/ProfileCard';
import GuideToggle from './GuideToggle';
import EventCard from '../../components/EventCard';

const MyPage = () => {
  return (
    <>
      <Grid display="flex">
        <MainTitle fs="sxl" width="auto">
          <Link href="/">프로필</Link>
        </MainTitle>

        <MainTitle fs="sxl" width="auto" margin="0 0 0 20px">
          <Link href="/" color="gray">
            나의 약속
          </Link>
        </MainTitle>
      </Grid>

      <ProfileCard />

      <Grid display="flex" hoz="space-between" margin="60px 0 0" ver="center">
        <SubTitle fs="la">길잡이 설정</SubTitle>

        <GuideToggle />
      </Grid>

      <Grid margin="60px 0 0" display="flex" hoz="space-between">
        <SubTitle fs="la" width="auto">
          닉네임 님의 여행 이벤트
        </SubTitle>

        <Link to="/" fs="sm" ver="center">
          추가하기 <ControlPointIcon style={{ marginLeft: '4px' }} />
        </Link>
      </Grid>

      <EventCard />
    </>
  );
};

MyPage.defaultProps = {};

export default MyPage;
