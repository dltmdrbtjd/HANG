import React from 'react';
import { useDispatch } from 'react-redux';
// icon
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import EditIcon from '@material-ui/icons/Edit';
// elements
import { Grid, MainTitle, Link, SubTitle, Button } from '../../elements';
// components
import ProfileCard from '../../components/ProfileCard';
import GuideToggle from './GuideToggle';
import EventCard from '../../components/EventCard';
// reducer
import { UserCreators } from '../../redux/modules/user';

const MyPage = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(UserCreators.logOutDB());
  };

  return (
    <>
      <Grid display="flex" ver="center" hoz="space-between">
        <Grid display="flex" width="center">
          <MainTitle fs="sxl" width="auto">
            <Link href="/mypage">프로필</Link>
          </MainTitle>

          <MainTitle fs="sxl" width="auto" margin="0 0 0 20px">
            <Link href="/mypage/promise" color="gray">
              나의 약속
            </Link>
          </MainTitle>
        </Grid>

        <Link href="/mypage/modify">
          수정하기 <EditIcon style={{ marginLeft: '4px' }} />
        </Link>
      </Grid>

      <ProfileCard />

      <Grid display="flex" hoz="space-between" margin="60px 0 0" ver="center">
        <SubTitle fs="la">길잡이 설정</SubTitle>

        <GuideToggle />
      </Grid>

      <Grid margin="60px 0 15px" display="flex" hoz="space-between">
        <SubTitle fs="la" width="auto">
          닉네임 님의 여행 이벤트
        </SubTitle>

        <Link to="/mypage/create_trip" fs="sm" ver="center">
          추가하기 <ControlPointIcon style={{ marginLeft: '4px' }} />
        </Link>
      </Grid>

      <Button _onClick={logOut}>로그아웃</Button>

      <EventCard btnText="삭제하기" />
    </>
  );
};

MyPage.defaultProps = {};

export default MyPage;
