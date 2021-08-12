import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// icon
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import SettingsIcon from '@material-ui/icons/Settings';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, SubTitle, Button, MainTitle, Ul, List } from '../../../elements';
// components
import ProfileCard from '../../../components/ProfileCard';
import GuideToggle from '../GuideToggle';
import EventCard from '../../../components/EventCard';
import DropDown from '../../../components/DropDown';
import NoPosts from '../../../components/NoPosts';
// reducer
import { MypageCreators } from '../../../redux/modules/mypage';
import { UserCreators } from '../../../redux/modules/user';
// style
import { SubTitleTextHidden, TabEventWrapper } from './style';

const MyInfo = () => {
  const { myInfo, tripList } = useSelector(
    state => ({
      myInfo: state.mypage.myInfo,
      tripList: state.mypage.tripList,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MypageCreators.GetMyInfoDB());
  }, []);

  const deleteTripEvent = tripId => {
    dispatch(MypageCreators.DeleteTripEventDB({ tripId }));
  };

  const logOut = () => {
    dispatch(UserCreators.logOutDB());
  };

  return (
    <>
      <Grid isFlex ver="center" hoz="space-between" margin="0 0 16px">
        <Ul isFlex>
          <List _onClick={() => history.push('/mypage')}>
            <MainTitle width="auto" fs="sxl" color="black">
              프로필
            </MainTitle>
          </List>

          <List _onClick={() => history.push('/mypage/promise')}>
            <MainTitle fs="sxl" width="auto" margin="0 0 0 20px" color="gray">
              나의 약속
            </MainTitle>
          </List>
        </Ul>

        <DropDown
          icon={<SettingsIcon />}
          contents={['프로필 수정', '로그아웃']}
          methods={[() => history.push('/mypage/modify'), logOut]}
          top="130px"
        />
      </Grid>

      <ProfileCard userInfo={myInfo} />

      <Grid isFlex hoz="space-between" margin="60px 0 0" ver="center">
        <SubTitle fs="la" fw="bold">
          길잡이 설정
        </SubTitle>

        <GuideToggle active={myInfo.guide} />
      </Grid>

      <Grid margin="60px 0 15px" isFlex hoz="space-between">
        <SubTitle fs="la" fw="bold" width="auto" addstyle={SubTitleTextHidden}>
          {myInfo.nickname} 님의 여행 이벤트
        </SubTitle>

        <Button
          isFlex
          ver="center"
          form="text"
          fs="xs"
          color="darkG"
          _onClick={() => {
            history.push('/mypage/create_trip');
          }}
        >
          추가하기 <ControlPointIcon style={{ marginLeft: '4px' }} />
        </Button>
      </Grid>

      <Grid tab={TabEventWrapper} margin="0 0 60px">
        <NoPosts
          list={tripList}
          title="여행 이벤트 등록하기"
          coment="여행 이벤트를 등록해보세요"
          link="/mypage/create_trip"
        >
          {tripList.map((tripInfo, idx) => (
            <EventCard
              key={(idx * Date.now() + Math.random()).toString(36)}
              btnText="삭제하기"
              userInfo={tripInfo}
              mainText="여행 이벤트 삭제하기"
              sub2Text="여행 이벤트를 삭제하시겠습니까?"
              agreeText="삭제"
              toastMessage="여행 이벤트가 삭제되었습니다."
              callback={() => deleteTripEvent(tripInfo.tripId)}
            />
          ))}
        </NoPosts>
      </Grid>
    </>
  );
};

export default MyInfo;
